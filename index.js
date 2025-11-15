const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello, World");
});
app.post("/send", (req, res) => {
    console.log("Data received from client:", req.body);
    res.json({ message: "Received!" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
