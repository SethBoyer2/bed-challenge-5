import express, { Router } from "express";
import * as resourceController from "../controllers/projectController";
import { resolveCname } from "node:dns";

const resourceRouter: express.Router = express.Router();

resourceRouter.post("/", resourceController.createResourceHandler);
resourceRouter.get("/", resourceController.getAllItemsHandler);

export default resourceRouter;
