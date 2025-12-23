import { MODEL_MESSAGES } from "../messages/messages.constant.js";
import { db } from "../utils/jsonDB.js";

class Comment {
  async create({ postId, content }) {
    const comments = await db.loadDB("comments");

    const comment = {
      id: Number(Date.now()),
      postId,
      content,
      createdAt: new Date(),
    };

    comments.push(comment);
    await db.saveDB("comments", comments);

    return comment;
  }

  async findAll() {
    return await db.loadDB("comments");
  }

  async findOneById(id) {
    const comments = await db.loadDB("comments");
    const comment = comments.find((c) => c.id === id);

    if (!comment) {
      throw new Error(MODEL_MESSAGES.COMMENT_NOT_FOUND);
    }

    return comment;
  }

  async updateById({ id, content }) {
    const comments = await db.loadDB("comments");

    const index = comments.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error(MODEL_MESSAGES.COMMENT_NOT_FOUND);
    }

    comments[index] = {
      ...comments[index],
      content,
    };

    await db.saveDB("comments", comments);
    return comments[index];
  }

  async deleteById(id) {
    const comments = await db.loadDB("comments");

    const index = comments.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error(MODEL_MESSAGES.COMMENT_NOT_FOUND);
    }

    comments.splice(index, 1);
    await db.saveDB("comments", comments);

    return true;
  }

  async deleteCommentsByPost(postId) {
    let comments = await db.loadDB("comments");
    comments = comments.filter((c) => Number(c.postId) !== Number(postId));

    await db.saveDB("comments", comments);
    return true;
  }
}

export const commentModel = new Comment();
