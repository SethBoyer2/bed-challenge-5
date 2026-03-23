import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";
import { getHelmetConfig } from "./config/helmetConfig";
import cors from "cors";
import { getCorsOptions } from "./config/corsConfig";
import resourceRouter from "./api/v1/routes/projectRoutes";

const app: Express = express();

if (process.env.NODE_ENV === "production") {
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    app.use(consoleLogger);
}

app.use(cors(getCorsOptions()));
app.use(getHelmetConfig())
app.use(express.json());


/** Update the api endppoints with appropriate routes **/
app.use("/api/v1/resource", resourceRouter);

app.use(errorHandler);

export default app;