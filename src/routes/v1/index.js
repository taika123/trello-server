import express from "express";
import StatusCodes from "http-status-codes";
import { boardRouter } from "./boardRoutes";
import { boardValidation } from "~/validations/boardValidation";
const Router = express.Router();

//check API V1
Router.get("/status", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "API message V1 is use !" });
});

//board API routes
Router.use("/boards", boardRouter);

export const APIs_v1 = Router;
