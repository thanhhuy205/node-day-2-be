import { Router } from "express";
import { commentRouter } from "./comments.route.js";
import postRouter from "./posts.route.js";
const appRouter = Router();

appRouter.use("/posts", postRouter);
appRouter.use("/comments", commentRouter);

export { appRouter };
