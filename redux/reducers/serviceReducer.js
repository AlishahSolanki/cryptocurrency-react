//
//  serviceReducer.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:22:21 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import * as types from "../actions/ActionTypes";
import _ from "lodash";
const initialState = {
    isFetching: false,
    failure: false,
    errorMessage: "",
    successMessage: "",
    data: [],
    code: "",
    errors: {},
    meta: {},
};
export default (type) => {
    return (state = initialState, action) => {
        switch (action.type) {
            case type.REQUEST:
                return {
                    ...state,
                    isFetching: true,
                };
            case type.SUCCESS:
                return {
                    ...state,
                    failure: false,
                    isFetching: false,
                    errorMessage: "",
                    successMessage: action.data.message,
                    data: action.data.data,
                    meta: action.data.meta,
                };
            case type.FAILURE:
                return {
                    ...state,
                    data: [],
                    code: action.error.code,
                    failure: true,
                    isFetching: false,
                    errorMessage: action.error.message,
                    errors: action.error.errors,
                    meta: {},
                    successMessage: "",
                };
            case type.UPDATE:
                return updateOperation(state, action, type.UPDATE);
            case type.DELETE:
                return deleteOperation(state, action);
            default:
                return state;
        }
    };
};
const updateOperation = (state, action, type) => {
    isArray = Array.isArray(state.data);
    switch (type) {
        case types.APP_STATE.UPDATE:
            return {
                ...state,
                data: { ...state.data, ...action.data },
            };
        default:
            if (action.key && action.path) {
                return {};
            } else {
                if (isArray) {
                    return {
                        ...state,
                        data: [...state.data, action.data],
                    };
                } else {
                    return {
                        ...state,
                        data: { ...state.data, ...action.data },
                    };
                }
            }
    }
};
const deleteOperation = (state, action) => {
    isArray = Array.isArray(state.data);
    if (action.key && action.where) {
        if (isArray) {
            const newData = [...state.data];
            const index = state.data.findIndex(
                (item) => item[action.key] === action.where
            );
            newData.splice(index, 1);
            return {
                ...state,
                data: newData,
            };
        } else {
            return state;
        }
    } else {
        return state;
    }
};
