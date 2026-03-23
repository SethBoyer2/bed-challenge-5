import express, { Router } from "express";
import * as resourceController from "../controllers/projectController";
import { validateRequest } from "../middleware/validate";
import { itemSchemas } from "../validation/resourceValidation";

const resourceRouter: express.Router = express.Router();

/**
 * @openapi
 * /resource:
 *   post:
 *     summary: Create a new library resource
 *     tags: [Resource]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - type
 *               - url
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: "JSDoc quickstart guide"
 *               type:
 *                 type: string
 *                 description: type of resource (eg. video, documentation, etc...)
 *                 example: "documentation"
 *               url:
 *                 type: string
 *                 example: "https://w3schools.net/how2Java"
 *               description:
 *                  type: string
 *                  example: "Quickstart guide for JSDoc documentation"
 *     responses:
 *       '201':
 *         description: Resource created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/Resource'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/Error'
 */
resourceRouter.post("/", validateRequest(itemSchemas.create), resourceController.createResourceHandler);

resourceRouter.get("/", resourceController.getAllItemsHandler);
resourceRouter.get("/{id}", validateRequest(itemSchemas.getById), resourceController.getItemByIdHandler);
resourceRouter.delete("/{id}", validateRequest(itemSchemas.getById), resourceController.deleteItemHandler);

export default resourceRouter;
