const Joi = require("joi");
import StatusCodes from "http-status-codes";
import { title } from "process";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(56).trim().strict().messages({
      "any.required": "title is required ",
      "string.empty": "title is not allowed",
      "string.min": "title min 3 chars ",
      "string.max": "title max 50 chars",
      "string.trim": "title must not have leading or trailing spaces",
    }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
  });

  try {
    // console.log(req.body);

    //res all message abortEarly: false return all messages
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    // next();
    res
      .status(StatusCodes.CREATED)
      .json({ message: "POST created successfully" });
  } catch (err) {
    // console.log(err);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(err).message,
    });
  }
  // res
  //   .status(StatusCodes.CREATED)
  //   .json({ message: "Post form create new is use !" });
};

export const boardValidation = {
  createNew,
};
