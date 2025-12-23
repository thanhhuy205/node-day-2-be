import express from "express";
import commentsController from "../controllers/comments.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createCommentSchema,
  updateCommentSchema,
} from "../validations/comment.validation.js";

const commentRouter = express.Router();

commentRouter.get("/", commentsController.getAll);
commentRouter.get("/:id", commentsController.getById);
commentRouter.post(
  "/",
  validate(createCommentSchema),
  commentsController.create
);
commentRouter.put(
  "/:id",
  validate(updateCommentSchema),
  commentsController.update
);
commentRouter.delete("/:id", commentsController.delete);

export { commentRouter };
