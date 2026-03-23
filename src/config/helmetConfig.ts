// config/helmetConfig.ts - Recommended starter configuration
import helmet from "helmet";

export const getHelmetConfig = () => {
    const isDevelopment = process.env.NODE_ENV === "development";

    // Base configuration for APIs
    const baseConfig = {
        contentSecurityPolicy: false, // Limits what can be executed or fetched, reducing risk of malicious injection
        hidePoweredBy: true, // Removes information regarding tech stack, preventing vulnerability gathering
        noSniff: true, // Prevent MIME sniffing by default to avoid executing hidden malicious code in images/gifs
    };

    if (isDevelopment) {
        return helmet({
            ...baseConfig,
            hsts: false, // No HTTPS enforcement in development
        });
    }

    // Production gets full security
    return helmet({
        ...baseConfig,
        hsts: { // hsts force HTTPS data transit only to help prevent MITM
            maxAge: 31536000, // Remember to use only HTTPS for maximum amount of time
            includeSubDomains: true, // Apply HSTS to all subdomains
            preload: true, // Hardcode sites as HTTPS only, preventing HTTP request altogether
        },
        frameguard: { action: "deny" }, // Disallow frames to prevent clickjacking attacks
        referrerPolicy: { policy: "no-referrer" }, // Prevent tracking for referred links
    });
};

