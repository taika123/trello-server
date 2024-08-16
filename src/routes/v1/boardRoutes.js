import express from "express";
import StatusCodes from "http-status-codes";
import { boardValidation } from "~/validations/boardValidation";

const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    res
      .status(StatusCodes.OK)
      .json({ message: "API message  get list board  is use !" });
  })
  .post(boardValidation.createNew);

export const boardRouter = Router;
