import { Request, Response, NextFunction } from "express";
import * as resourceServices from "../services/projectService";
import { successResponse, errorResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const createResourceHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { title, type, url, description } = req.body;
        const data = { title, type, url, description };

        // Call service function.
        const resource = await resourceServices.createResource(data);

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(resource, "Resource successfully created") // Use successful response model.
        );
    } catch (error: unknown) {
        next(error);
    }
};

export const getAllItemsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        // Call service function.
        const resources = await resourceServices.getAllItems();

        res.status(HTTP_STATUS.OK).json(
            successResponse(resources, "Items successfully retrieved") // Use successful response model.
        );
    } catch (error: unknown) {
        next(error);
    }
};

