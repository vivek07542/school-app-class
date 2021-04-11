import { put } from "redux-saga/effects";
import * as actionType from "../Redux/reducer";

export function* initilizerHandlerSaga() {
    window.localStorage.clear();
    const schoolApp = {
        editStudentDetailMode: false,
        editStudentDetailModeObject: {},
        studentDetail: [],
      
    }
    const markApp = {
        activePopup : false,
        studentMarkObject : {},
        editMarkMode : false,
        markDetail : [],
        studentId : "",
        studentName : ""
    }
    yield localStorage.setItem("schoolApp", JSON.stringify(schoolApp));
    yield localStorage.setItem("markApp",JSON.stringify(markApp));
}

export function* submitFormHandlerSaga(action) {
    const localValue = JSON.parse(localStorage.getItem("schoolApp"));
    const updateValue = { ...localValue };
    if (action.studentDetailObject.id !== null && action.editStudentDetailMode === true) {
        const editObjIndex = updateValue.studentDetail.findIndex(student => student.id === action.studentDetailObject.id)
        updateValue.studentDetail[editObjIndex] = action.studentDetailObject;
        updateValue.editStudentDetailModeObject = {};
    }
    else {
        let studentLast = null;
        if (updateValue.studentDetail.length !== 0) {
            const expenseLastItem = updateValue.studentDetail[updateValue.studentDetail.length - 1];
            studentLast = +expenseLastItem.id;
        }
        else {
            studentLast = 0;
        }
        const studentDetailObject = action.studentDetailObject;
        studentDetailObject.id = studentLast + 1;
        updateValue.studentDetail.push(studentDetailObject);
    }
    updateValue.editStudentDetailMode = false;
    yield localStorage.setItem("schoolApp", JSON.stringify(updateValue));
    yield put(actionType.submitFormHandlerSuccess(updateValue));
}

export function* editStudentDetailHandlerSaga(action) {
    const localValue = JSON.parse(localStorage.getItem("schoolApp"));
    const updateValue = { ...localValue };
    updateValue.editStudentDetailMode = action.editStudentDetailMode
    const editObj = updateValue.studentDetail.find(student => student.id === action.id);
    updateValue.editStudentDetailModeObject = editObj;
    yield localStorage.setItem("schoolApp", JSON.stringify(updateValue));
    yield put(actionType.editStudentDetailHandlerSuccess(updateValue));

}

export function* deleteStudentDetailHandlerSaga(action) {
    const localValue = JSON.parse(localStorage.getItem("schoolApp"));
    const updateValue = { ...localValue };
    const editObjIndex = updateValue.studentDetail.findIndex(student => student.id === action.id);
    updateValue.studentDetail.splice(editObjIndex, 1);
    yield localStorage.setItem("schoolApp", JSON.stringify(updateValue));
    yield put(actionType.deleteStudentDetailHandlerSuccess(updateValue));
}

