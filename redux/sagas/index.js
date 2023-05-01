import { fork } from "redux-saga/effects";
import init from "./init";
import serviceSaga from "./serviceSaga";
export default function* root() {
    yield fork(init);
    yield fork(serviceSaga);
}
