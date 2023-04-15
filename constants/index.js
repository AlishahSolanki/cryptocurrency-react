//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:13:09 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
//https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=GBP&limit=10
const constant = {
    //Services Constants
    login: "login",
    updatePassword: "updatepassword",
    version: "v2/",
    top: "top/",
    histominute: "histominute",
    totalvolfull: "totalvolfull",
    //Socket Constants
    //     failure: { action: "failure", packet_code: 9900 },
    //Location Constants
    LOCATION_TIME_OUT: 10000,
    LOCATION_MAX_AGE: 1000,
    LOCATION_HIGH_ACCURACY: false,
};

export default constant;
