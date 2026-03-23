import express, { Router } from "express";
import * as resourceController from "../controllers/projectController";
import { validateRequest } from "../middleware/validate";
import { itemSchemas } from "../validation/resourceValidation";

const resourceRouter: express.Router = express.Router();

resourceRouter.post("/", validateRequest(itemSchemas.create), resourceController.createResourceHandler);
resourceRouter.get("/", resourceController.getAllItemsHandler);
resourceRouter.get("/{id}", validateRequest(itemSchemas.getById), resourceController.getItemByIdHandler);
resourceRouter.delete("/{id}", validateRequest(itemSchemas.getById), resourceController.deleteItemHandler);

export default resourceRouter;
