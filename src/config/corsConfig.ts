// config/corsConfig.ts
export const getCorsOptions = () => {
    const isDevelopment = process.env.NODE_ENV === "development";

    if (isDevelopment) {
        // Allow all origins in development for easy testing
        return {
            origin: true,
            credentials: true,
        };
    }

    // Strict origins in production
    return {
        origin: process.env.ALLOWED_ORIGINS?.split(",") || [], // Read allowed origins from env var and append to an array
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"], // allowed methods
        allowedHeaders: ["Content-Type", "Authorization"], // allowed headers
        maxAge: 31536000 // Max age for preflight cache (max possible)
    };
};

