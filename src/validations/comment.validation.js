import * as yup from "yup";
import { VALIDATE_MESSAGES } from "../constant/message.constant.js";

export const createCommentSchema = yup.object({
  body: yup.object({
    postId: yup
      .number()
      .required(VALIDATE_MESSAGES.POST_ID_REQUIRED)
      .positive(VALIDATE_MESSAGES.POST_ID_POSITIVE)
      .integer(VALIDATE_MESSAGES.POST_ID_INTEGER),
    content: yup
      .string()
      .required(VALIDATE_MESSAGES.COMMENT_CONTENT_REQUIRED)
      .min(1, VALIDATE_MESSAGES.COMMENT_CONTENT_MIN)
      .max(500, VALIDATE_MESSAGES.COMMENT_CONTENT_MAX)
      .trim(),
  }),
});

export const updateCommentSchema = yup.object({
  body: yup.object({
    content: yup
      .string()
      .required(VALIDATE_MESSAGES.COMMENT_CONTENT_REQUIRED)
      .min(1, VALIDATE_MESSAGES.COMMENT_CONTENT_MIN)
      .max(500, VALIDATE_MESSAGES.COMMENT_CONTENT_MAX)
      .trim(),
  }),
  params: yup.object({
    id: yup
      .number()
      .required(VALIDATE_MESSAGES.ID_REQUIRED)
      .positive(VALIDATE_MESSAGES.ID_POSITIVE)
      .integer(VALIDATE_MESSAGES.ID_INTEGER),
  }),
});
