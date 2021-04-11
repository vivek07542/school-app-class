import { put } from "redux-saga/effects";
import * as actionMarkType from "../Redux/MarkReducer";

export function* addMarkDetailHandlerSaga(action) {
    // const localStudentValue = JSON.parse(localStorage.getItem("schoolApp"));
    // const studentDetailFromStorage = { ...localStudentValue };
    const localMarkValue = JSON.parse(localStorage.getItem("markApp"));
    const updateValue = { ...localMarkValue };
    updateValue.activePopup = action.activePopup;
    yield localStorage.setItem("markApp", JSON.stringify(updateValue));
    yield put(actionMarkType.addMarkDetailHandlerSuccess(updateValue,action.id,action.studentName));
}

export function* addMarkToStudentSaga(action){
    const localMarkValue = JSON.parse(localStorage.getItem("markApp"));
    const updateValue = { ...localMarkValue };
    if(action.editMarkMode){
        const editObjIndex = updateValue.markDetail.findIndex(mark => mark.studentId === action.markObject.studentId)
        updateValue.markDetail[editObjIndex] = action.markObject;
    }
    else{
        updateValue.markDetail.push(action.markObject);
    }
    updateValue.studentMarkObject = {};
    updateValue.studentId = "";
    updateValue.studentName = "";
    updateValue.activePopup = false;
    updateValue.editMarkMode = false;
    yield localStorage.setItem("markApp", JSON.stringify(updateValue));
    yield put(actionMarkType.addMarkToStudentSuccess(updateValue));
}

export function* editStudentMarkSaga(action) {
    const localMarkValue = JSON.parse(localStorage.getItem("markApp"));
    const updateValue = { ...localMarkValue };
    // const editMarkObj = updateValue.markDetail.find(student => student.studentId === action.editObject.studentId);
    updateValue.studentMarkObject = action.editObject;
    updateValue.editMarkMode = true;
    updateValue.activePopup = true;
    updateValue.studentId = action.editObject.studentId;
    updateValue.studentName =action.editObject.studentName;

    yield localStorage.setItem("markApp", JSON.stringify(updateValue));
    yield put(actionMarkType.editStudentMarkSuccess(updateValue));  
}