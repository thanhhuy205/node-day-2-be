import { StatusCodes } from "http-status-codes";

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(
      {
        body: req.body,
        query: req.query,
        params: req.params,
      },
      { abortEarly: false }
    );
    next();
  } catch (error) {
    const errors = error.inner.reduce((acc, err) => {
      const path = err.path.replace(/^(body|query|params)\./, "");
      acc[path] = err.message;
      return acc;
    }, {});

    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Validation lỗi",
      errors,
    });
  }
};
