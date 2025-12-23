import { VALIDATE_MESSAGES } from "#constant/message.constant.js";
import * as yup from "yup";

export const createPostSchema = yup.object({
  body: yup.object({
    title: yup
      .string()
      .required(VALIDATE_MESSAGES.POST_TITLE_REQUIRED)
      .min(3, VALIDATE_MESSAGES.POST_TITLE_MIN)
      .max(200, VALIDATE_MESSAGES.POST_TITLE_MAX)
      .trim(),
    content: yup
      .string()
      .required(VALIDATE_MESSAGES.POST_CONTENT_REQUIRED)
      .min(10, VALIDATE_MESSAGES.POST_CONTENT_MIN)
      .max(5000, VALIDATE_MESSAGES.POST_CONTENT_MAX)
      .trim(),
  }),
});

export const updatePostSchema = yup.object({
  body: yup.object({
    title: yup
      .string()
      .optional()
      .min(3, VALIDATE_MESSAGES.POST_TITLE_MIN)
      .max(200, VALIDATE_MESSAGES.POST_TITLE_MAX)
      .trim(),
    content: yup
      .string()
      .optional()
      .min(10, VALIDATE_MESSAGES.POST_CONTENT_MIN)
      .max(5000, VALIDATE_MESSAGES.POST_CONTENT_MAX)
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
