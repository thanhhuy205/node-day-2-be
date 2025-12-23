import postsController from "#controllers/posts.controller.js";
import { validate } from "#middlewares/validate.middleware.js";
import {
  createPostSchema,
  updatePostSchema,
} from "#validations/post.validation.js";
import express from "express";

const postRouter = express.Router();

postRouter.get("/", postsController.getAll);
postRouter.get("/:id", postsController.getById);
postRouter.post("/", validate(createPostSchema), postsController.create);
postRouter.put("/:id", validate(updatePostSchema), postsController.update);
postRouter.delete("/:id", postsController.delete);

export default postRouter;
