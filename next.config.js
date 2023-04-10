const webpack = require("webpack");
const path = require("path");

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, "css")],
    },
    output: {
        publicPath: "auto",
    },
};
