import express from "express";
import { client, openai } from "../mongodb.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();
const db = client.db("socialapp");
const dbCollection = db.collection("posts");
const dbCollectionUsers = db.collection("users");

// const getProfile = async (req, res) => {
//   const userId = req.params.userId;

//   if (!ObjectId.isValid(userId) && userId !== undefined) {
//     res.status(403).send(`Invalid user id`);
//     return;
//   }
//   try {
//     const result = await dbCollection.findOne({
//       _id: new ObjectId(userId),
//     });
//     console.log(result);
//     res.send({
//       message: "Profile fetched",
//       data: {
//         firstName: result.firstName,
//         lastName: result.lastName,
//         email: result.email,
//       },
//     });
//   } catch (error) {
//     console.log("error getting data mongodb: ", error);
//     res.status(500).send({ message: "server error, please try later" });
//   }
// };
router.get("/profile/:userId", async (req, res) => {
  console.log("unauth route profile api");
  const userId = req.params.userId;

  if (!ObjectId.isValid(userId) && userId !== undefined) {
    res.status(403).send(`Invalid user id`);
    return;
  }
  try {
    const result = await dbCollectionUsers.findOne({
      _id: new ObjectId(userId),
    });
    console.log(result);
    res.send({
      message: "Profile fetched",
      data: {
        firstName: result?.firstName,
        lastName: result?.lastName,
        email: result?.email,
      },
    });
  } catch (error) {
    console.log("error getting data mongodb: ", error);
    res.status(500).send({ message: "server error, please try later" });
  }
});

router.get("/posts", async (req, res, next) => {
  const userId = req.query._id;
  if (!ObjectId.isValid(userId) && userId !== undefined) {
    res.status(403).send(`Invalid post id`);
    return;
  }
  const allPosts = dbCollection
    .find({ authorId: new ObjectId(userId) })
    .sort({ _id: -1 })
    .limit(10);
  try {
    const allPostsIntoArray = await allPosts.toArray();
    console.log("allPostsIntoArray :", allPostsIntoArray);

    res.send(allPostsIntoArray);
  } catch (error) {
    res.status(500).send("server error, please try later");
  }
});

router.get("/search", async (req, res) => {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: req.query.q,
    });
    const vector = response?.data[0]?.embedding;
    console.log("vector: ", vector);
    // [ 0.0023063174, -0.009358601, 0.01578391, ... , 0.01678391, ]

    // Query for similar documents.
    const documents = await dbCollection
      .aggregate([
        {
          $search: {
            index: "default",
            knnBeta: {
              vector: vector,
              path: "embedding",
              k: 10, // number of documents
            },
            scoreDetails: true,
          },
        },
        {
          $project: {
            embedding: 0,
            score: { $meta: "searchScore" },
            scoreDetails: { $meta: "searchScoreDetails" },
          },
        },
      ])
      .toArray();
    console.log(`${documents.length} records found `);
    res.send(documents);
  } catch (e) {
    console.log("error getting data mongodb: ", e);
    res.status(500).send("server error, please try later");
  }
});
router.use((req, res) => {
  res.status(401).send({ message: "invalid token" });
  return;
});
export default router;
