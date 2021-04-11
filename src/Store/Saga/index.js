import { takeLatest } from "@redux-saga/core/effects";
import * as actionType from "../Redux/reducer";
import * as actionMarkType from "../Redux/MarkReducer";
import {initilizerHandlerSaga,submitFormHandlerSaga,editStudentDetailHandlerSaga,deleteStudentDetailHandlerSaga} from "./saga";
import {addMarkDetailHandlerSaga,addMarkToStudentSaga,editStudentMarkSaga} from "./MarkSaga";

export function* watch(){
    yield takeLatest(actionType.INIT,initilizerHandlerSaga);
    yield takeLatest(actionType.STUDENT_DETAIL_SUBMIT_INIT,submitFormHandlerSaga);
    yield takeLatest(actionType.EDIT_STUDENT_DETAIL_INIT,editStudentDetailHandlerSaga);
    yield takeLatest(actionType.DELETE_STUDENT_DETAIL_INIT,deleteStudentDetailHandlerSaga);
    yield takeLatest(actionMarkType.ADD_MARK_DETAIL_INIT,addMarkDetailHandlerSaga);
    yield takeLatest(actionMarkType.SUBMIT_BUTTON_HANDLER_INIT,addMarkToStudentSaga)
    yield takeLatest(actionMarkType.EDIT_MARK_INIT,editStudentMarkSaga);


}
