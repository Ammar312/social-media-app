import express from "express";
import path from "path";
import cors from "cors";
import "dotenv/config";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import apiv1 from "./APIv1/index.mjs";
import authRouter from "./APIv1/auth.mjs";
import unAuthRouter from "./unAuthRoutes/unAuth.mjs";

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1", authRouter);
app.use("/api/v1", (req, res, next) => {
  const token = req.cookies.token;
  console.log("token", token);
  try {
    const decoded = Jwt.verify(token, process.env.SECRET);
    console.log("decoded", decoded);
    req.body.decoded = {
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      email: decoded.email,
      isAdmin: decoded.isAdmin,
      _id: decoded._id,
    };
    next();
  } catch (error) {
    console.log("errorabc", error);
    unAuthRouter(req, res);
    return;
  }
});

app.use("/api/v1", apiv1);
// app.use("/api/v1/ping", (req, res) => {
//   res.send({ message: "ok" });
// });
app.get("/", express.static(path.join(__dirname, "web/dist")));
app.use("/", express.static(path.join(__dirname, "web/dist")));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "web/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
