import express from "express";
const router = express.Router();
import { client } from "../mongodb.mjs";
import { ObjectId } from "mongodb";
const db = client.db("socialapp");
const dbCollection = db.collection("users");

const getProfile = async (req, res, next) => {
  const userId = req.params.userId || req.body.decoded._id;

  if (!ObjectId.isValid(userId)) {
    res.status(403).send(`Invalid user id`);
    return;
  }
  try {
    const result = await dbCollection.findOne({
      _id: new ObjectId(userId),
    });
    console.log(result);
    res.send({
      message: "Profile fetched",
      data: {
        isAdmin: result.isAdmin,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        _id: result._id,
      },
    });
  } catch (error) {
    console.log("error getting data mongodb: ", error);
    res.status(500).send({ message: "server error, please try later" });
  }
};
router.get("/profile", getProfile);
router.get("/profile/:userId", getProfile);

export default router;
