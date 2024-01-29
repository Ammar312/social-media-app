import express from "express";
let router = express.Router();

import authRouter from "./auth.mjs";
import commentRouter from "./comment.mjs";
import feedRouter from "./feed.mjs";
import postRouter from "./post.mjs";
import profileRouter from "./profile.mjs";

router.use(authRouter);

router.use(commentRouter);
router.use(postRouter);
router.use(feedRouter);
router.use(profileRouter);

export default router;
