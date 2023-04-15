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
            `${process.env.BASE_URL_CRYPTO_COMPARE}${constant.histominute}`,
            { params: { ...req.query, api_key: process.env.API_TOKEN } }
        );
        res.status(response.status).json(response.data);
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Server error in creating product");
    }
}
// async function handlePostRequest(req, res) {
//     try {
//         let data = req.body;
//         data["ssn"] = await bcrypt.hash(data["ssn"].replace("/-/g", ""), 10);
//         if (_.isEmpty(data["supervisorId"])) {
//             data = _.omit(data, "supervisorId");
//         }
//         //Create Staff
//         const staff = await new Staff(data).save();

//         //Covert Temp password to hash
//         let genPwd = utility.passwordGenerator(10);
//         let hashPwd = await bcrypt.hash(genPwd, 10);

//         //Create Staff as User
//         let usrData = {
//             username: staff.firstName,
//             email: staff.emailAssigned,
//             password: hashPwd,
//             token: "",
//             roleId: staff.roleId,
//             staffId: staff._id,
//             isFirstLogin: true,
//         };

//         let user = await new Users(usrData).save();

//         //Call Mailer
//         await mailer.newUserAccount(
//             "\\utils\\html\\newuser.html",
//             data["emailAssigned"],
//             "User has been Created",
//             {
//                 email: data["emailAssigned"],
//                 password: genPwd,
//             }
//         );

//         res.status(201).json({ data: staff, meta: {} });
//     } catch (error) {
//         console.log(error);
//         let simplifiedErr = errorHandler.serverErrorHandler(error);
//         res.status(simplifiedErr.code).json(simplifiedErr.errors);
//     }
// }
