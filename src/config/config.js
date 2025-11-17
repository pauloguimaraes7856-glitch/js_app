import dotenv from "dotenv"
dotenv.config()

export const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
    databaseUrl: process.env.DATABASE_URL || "./database.sqlite",
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    isDevelopment() {
        return this.nodeEnv === "development"
    },
    isProduction() {
        return this.nodeEnv === "production"
    }
}

export default config