import { commentModel } from "#models/comment.model.js";
import { StatusCodes } from "http-status-codes";
class CommentsController {
  async getAll(req, res) {
    try {
      const comments = await commentModel.findAll();
      res.status(StatusCodes.OK).json(comments);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const id = Number(req.params.id);
      const comment = await commentModel.findOneById(id);
      res.status(StatusCodes.OK).json(comment);
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const { postId, content } = req.body;
      const comment = await commentModel.create({ postId, content });
      res.status(StatusCodes.CREATED).json(comment);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const id = Number(req.params.id);
      const { content } = req.body;

      const comment = await commentModel.updateById({
        id,
        content,
      });

      res.status(StatusCodes.OK).json(comment);
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const id = Number(req.params.id);
      await commentModel.deleteById(id);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: error.message,
      });
    }
  }
}

export default new CommentsController();
