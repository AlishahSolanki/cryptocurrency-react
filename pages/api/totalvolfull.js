import _ from "lodash";
import axios from "axios";
import constant from "../../constants";

export default (req, res) => {
    switch (req.method) {
        case "GET":
            handleGetRequest(req, res);
            break;
        case "DELETE":
            //handleDeleteRequest(req, res);
            break;
        case "POST":
            // handlePostRequest(req, res);
            break;
        default:
            res.status(405).send(`Method ${req.method} not allowed`);
            break;
    }
};
async function handleGetRequest(req, res) {
    try {
        let response = await axios.get(
            `${process.env.BASE_URL_CRYPTO_COMPARE}${constant.top}${constant.totalvolfull}`,
            { params: { ...req.query, api_key: process.env.API_TOKEN } }
        );
        console.log('Sanjib tolVolFull', response)

        res.status(response.status).json(response.data);
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Server error in creating product");
    }
}
