const webpack = require("webpack");
const path = require("path");

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, "css")],
    },
    output: {
        publicPath: "auto",
    },
    env: {
        BASE_URL_CRYPTO_COMPARE: "https://min-api.cryptocompare.com/data/",
        API_TOKEN:
            "346a5653477eed39d369f3b05523c27a427a45ab31125be8a8dbf06cf4478d49",
        PORT: 3000,
        BASE_URL: "https://cryptocurrency-react-nine.vercel.app/api/",
    },
};
