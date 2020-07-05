const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const cors = require("cors");
const { LAMBDA, PORT, NODE_ENV } = process.env;
const dynamo = require("./server/dynamo");

const port = parseInt(PORT, 10) || 3000;
const dev = NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

global.fetch = require("node-fetch");

const createServer = () => {
    const server = express();
    server.use(bodyParser.json({ limit: "50mb" }));
    server.use(cors());
    server.get("/posts", async (req, res) => {
        try {
            const data = await dynamo.getPosts();
            res.status(200).json({
                data: data
            });
        } catch (error) {
            res.status(500).json(error);
        }
    });
    server.get("*", (req, res) => handle(req, res));
    return server;
};

const server = createServer();

if (!LAMBDA) {
    app.prepare().then(() => {
        server.listen(port, err => {
            if (err) throw err;
            console.log(`Ready on http://localhost:${port}`);
        });
    });
}

exports.app = app;
exports.server = server;