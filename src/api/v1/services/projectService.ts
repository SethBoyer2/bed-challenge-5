import * as firestoreRepository from "../repository/firestoreRepository";
import { Resource } from "../models/resourceModel";

const COLLECTION = "resource";

export const createResource = async (
    data: {
        title: string,
        type: string,
        url: string,
        description: string
    }, // Required data fields,
): Promise<Resource> => {
    try {
        const newResource = {
            ...data,
            createdAt: new Date().toISOString(),
        };

        // Add item to database.
        const id = await firestoreRepository.createDocument<Resource>(COLLECTION, data);

        return {id, ...newResource}; // Return object here.
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error(`Failed to create item: ${errorMessage}`);
    }
};

export const getAllItems = async (): Promise<Resource[]> => {
    try {
        return (
            await firestoreRepository.getAllDocuments<Resource>(COLLECTION)
        );
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error(`Failed to retrieve all \
                         items: ${errorMessage}`);
    }
};

export const getItemById = async(
    id: string,
): Promise<Resource> => {
    try {
        const resource = await firestoreRepository
                                    .getDocumentById<Resource>(COLLECTION, id);

        if (!resource) throw new Error(`Resource with id: (${id}) not found`);

        return resource;
    } catch (error:unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error(`Failed to retrieve \
                         item by id: ${errorMessage}`);
    }
};
