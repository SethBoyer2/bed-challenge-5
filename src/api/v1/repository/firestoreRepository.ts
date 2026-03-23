import { FirebaseMessagingSessionError } from "firebase-admin/lib/utils/error";
import { db } from "../../../config/firebaseConfig";

const createId = async(): Promise<number> => {
    try {
        const docRef = db.collection("resource-info").
            doc("resource-global-metrics");
        const snapshot = await docRef.get();
        const { ...data } = snapshot.data();

        const newCount = (data["count"] as number) + 1;

        docRef.update({
            "count": newCount,
        });
        return newCount;
    } catch (error:unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error(`Failed to create document id: ${errorMessage}`);
    }
};

// POST createDocument
export const createDocument = async<T>(
    collectionName: string,
    data: Partial<T>,
): Promise<number> => {
    try {
        const id = await createId();
        await db.collection(collectionName).doc(id.toString()).set(data);
        return id;
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error(`Failed to create resource: ${errorMessage}`)
    }
};

// GET getAllDocuments
export const getAllDocuments = async<T>(
    collectionName: string,
): Promise<T[]> => {
    try {
        let collectRef: FirebaseFirestore.CollectionReference;

        collectRef = db.collection(collectionName);
        const snapshot = await collectRef.get();

        return (snapshot).docs.map(docs => ({
            id: docs.id,
            ...docs.data() as T,
        }));
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error(`Failed to get resources: ${errorMessage}`)
    }
};

// GET getDocumentById
export const getDocumentById = async<T>(
    collectionName: string,
    id: string
): Promise<T | null> => {
    try {
        let docRef: FirebaseFirestore.DocumentReference;
        docRef = db.collection(collectionName).doc(id);
        const snapshot = await docRef.get();

        if (!(snapshot.exists)) return null;

        return {
            id: snapshot.id,
            ...snapshot.data() as T
        };
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error(`Failed to [replace] document: ${errorMessage}`)
    }
};

