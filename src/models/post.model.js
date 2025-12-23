import { MODEL_MESSAGES } from "@/messages/messages.constant.js";
import { commentModel } from "@/models/comment.model.js";
import { db } from "@/utils/jsonDB.js";

class Post {
  async create({ title, content }) {
    const posts = await db.loadDB("posts");

    const post = {
      id: Number(Date.now()),
      title,
      content,
      createdAt: new Date(),
    };

    posts.push(post);
    await db.saveDB("posts", posts);

    return post;
  }

  async findAll() {
    return await db.loadDB("posts");
  }

  async findOneById(id) {
    const posts = await db.loadDB("posts");
    const post = posts.find((p) => p.id === id);

    if (!post) {
      throw new Error(MODEL_MESSAGES.POST_NOT_FOUND);
    }

    return post;
  }

  async updateById({ id, payload }) {
    const posts = await db.loadDB("posts");

    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(MODEL_MESSAGES.POST_NOT_FOUND);
    }

    posts[index] = {
      ...posts[index],
      ...(payload.title && { title: payload.title }),
      ...(payload.content && { content: payload.content }),
    };

    await db.saveDB("posts", posts);
    return posts[index];
  }

  async deleteById(id) {
    const posts = await db.loadDB("posts");

    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(MODEL_MESSAGES.POST_NOT_FOUND);
    }

    posts.splice(index, 1);

    await Promise.all([
      commentModel.deleteCommentsByPost(id),
      db.saveDB("posts", posts),
    ]);

    return true;
  }
}

export const postModel = new Post();
