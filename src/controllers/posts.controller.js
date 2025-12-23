import { postModel } from "@/models/post.model.js";
import { StatusCodes } from "http-status-codes";

class PostsController {
  async getAll(req, res) {
    try {
      const posts = await postModel.findAll();
      res.status(StatusCodes.OK).json(posts);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const id = Number(req.params.id);
      const post = await postModel.findOneById(id);
      res.status(StatusCodes.OK).json(post);
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const { title, content } = req.body;
      const post = await postModel.create({ title, content });
      res.status(StatusCodes.CREATED).json(post);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const id = Number(req.params.id);
      const { title, content } = req.body;

      const post = await postModel.updateById({
        id,
        payload: { title, content },
      });

      res.status(StatusCodes.OK).json(post);
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const id = Number(req.params.id);
      await postModel.deleteById(id);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: error.message,
      });
    }
  }
}

export default new PostsController();
