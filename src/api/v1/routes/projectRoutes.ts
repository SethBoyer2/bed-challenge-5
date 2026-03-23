import express, { Router } from "express";
import * as resourceController from "../controllers/projectController";
import { validateRequest } from "../middleware/validate";
import { itemSchemas } from "../validation/resourceValidation";

const resourceRouter: express.Router = express.Router();

resourceRouter.post("/", validateRequest(itemSchemas.create), resourceController.createResourceHandler);

export default resourceRouter;
