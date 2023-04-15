const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const HOST = "test.com";
const PORT = 3000;
const httpsOptions = {
    key: fs.readFileSync("./test.com.key"),
    cert: fs.readFileSync("./test.com.crt"),
};
app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {
        console.log("req", req, " res", res);
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(PORT, HOST, (err) => {
        if (err) throw err;
        console.log("> Server started on https://test.com:3000", HOST);
    });
});
