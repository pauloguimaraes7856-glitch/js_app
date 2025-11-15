import config from "../config/config.js"

export const validateApiKey = (req, res, next) => {
    const key = req.headers["x-api-key"]

    if (!key) {
        return res.status(401).json({ error: "API key missing" })
    }
    if (key !== config.apiKey) {
        return res.status(403).json({ error: "Invalid API key" })
    }

    next()
}
