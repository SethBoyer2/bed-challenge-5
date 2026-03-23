import express, { Router } from "express";
import * as resourceController from "../controllers/projectController";

const resourceRouter: express.Router = express.Router();

resourceRouter.post("/", resourceController.createResourceHandler);

export default resourceRouter;
