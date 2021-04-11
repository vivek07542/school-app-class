export const INIT = "INIT";
export const SUCC = "SUCC";
export const STUDENT_DETAIL_SUBMIT_INIT = "STUDENT_DETAIL_SUBMIT_INIT";
export const STUDENT_DETAIL_SUBMIT_SUCCESS = "STUDENT_DETAIL_SUBMIT_SUCCESS";
export const EDIT_STUDENT_DETAIL_INIT = "EDIT_STUDENT_DETAIL_INIT";
export const EDIT_STUDENT_DETAIL_SUCCESS = "EDIT_STUDENT_DETAIL_SUCCESS";
export const DELETE_STUDENT_DETAIL_INIT = "DELETE_STUDENT_DETAIL_INIT";
export const DELETE_STUDENT_DETAIL_SUCCESS = "DELETE_STUDENT_DETAIL_SUCCESS";


export const initilizerHandler =()=>{
    return{
        type : INIT      
    }
}
export const submitFormHandler = (editStudentDetailMode,studentDetailObject) =>{
    return{
        type : STUDENT_DETAIL_SUBMIT_INIT,
        editStudentDetailMode:editStudentDetailMode,
        studentDetailObject:studentDetailObject
    }
}
export const submitFormHandlerSuccess = (schoolApp) =>{
    return{
        type : STUDENT_DETAIL_SUBMIT_SUCCESS,
        editStudentDetailMode : schoolApp.editStudentDetailMode,
        studentDetail : schoolApp.studentDetail,
        editStudentDetailModeObject : schoolApp.editStudentDetailModeObject
    }
}
export const editStudentDetailHandler = (id,editStudentDetailMode) =>{
    return{
        type:EDIT_STUDENT_DETAIL_INIT,
        id : id,
        editStudentDetailMode : editStudentDetailMode
    }
}

export const editStudentDetailHandlerSuccess = (schoolApp) =>{
    return{
        type:EDIT_STUDENT_DETAIL_SUCCESS,
        editStudentDetailMode : schoolApp.editStudentDetailMode,
        editStudentDetailModeObject : schoolApp.editStudentDetailModeObject
    }
}

export const deleteStudentDetailHandler = (id) =>{
    return{
        type:DELETE_STUDENT_DETAIL_INIT,
        id:id
    }
}

export const deleteStudentDetailHandlerSuccess = (schoolApp) =>{
    return{
        type:DELETE_STUDENT_DETAIL_SUCCESS,
        studentDetail : schoolApp.studentDetail
    }
}

const initialState = {

    editStudentDetailMode : false,
    editStudentDetailModeObject : {},
    editStudentMarksMode:false,
    studentDetail : [],
    initState : null,
    addStudentMarkObject: {}
}
const reducer = (state=initialState,action) => {
    switch(action.type){
        case STUDENT_DETAIL_SUBMIT_SUCCESS : 
        return{
            ...state,
            editStudentDetailMode : action.editStudentDetailMode,
            studentDetail : action.studentDetail,
            editStudentDetailModeObject : action.editStudentDetailModeObject
        }
        case EDIT_STUDENT_DETAIL_SUCCESS : 
        return{
            ...state,
            editStudentDetailMode : action.editStudentDetailMode,
            editStudentDetailModeObject : action.editStudentDetailModeObject
        }
        case DELETE_STUDENT_DETAIL_SUCCESS : 
        return{
            ...state,
            studentDetail : action.studentDetail
        }

        default : 
        return state
    }
}

export default reducer
