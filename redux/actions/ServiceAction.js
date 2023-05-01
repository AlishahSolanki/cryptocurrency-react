import { GENERAL_ACTION } from "./ActionTypes";

const callback = () => {};
export function request(
    types, //Action Type
    service, //Service url
    service_type, //Web Service type 'post,get,put,delete....'
    data, //Paramter for request
    showHud, //Show spinner
    successCB = callback,
    failureCB = callback
) {
    return {
        payload: data,
        service,
        service_type,
        type: GENERAL_ACTION,
        request_type: types,
        showHud,
        successCB,
        failureCB,
    };
}
export function success(types, data) {
    return {
        data: data,
        type: types.SUCCESS,
    };
}

export function failure(types, error) {
    return {
        error,
        type: types.FAILURE,
    };
}
