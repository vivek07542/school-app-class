export const ADD_MARK_DETAIL_INIT = "ADD_MARK_DETAIL_INIT"; 
export const ADD_MARK_DETAIL_SUCCESS = "ADD_MARK_DETAIL_SUCCESS"; 
// export const ADD_BUTTON_HANDLER_INIT = "ADD_BUTTON_HANDLER_INIT";
// export const ADD_BUTTON_HANDLER_SUCCESS = "ADD_BUTTON_HANDLER_SUCCESS";
// export const SUBRACT_BUTTON_HANDLER_INIT = "SUBRACT_BUTTON_HANDLER_INIT";
// export const SUBRACT_BUTTON_HANDLER_SUCCESS = "SUBRACT_BUTTON_HANDLER_SUCCESS";
export const SUBMIT_BUTTON_HANDLER_INIT = "SUBMIT_BUTTON_HANDLER_INIT"
export const SUBMIT_BUTTON_HANDLER_SUCCESS = "SUBMIT_BUTTON_HANDLER_SUCCESS"
export const EDIT_MARK_INIT = "EDIT_MARK_INIT";
export const EDIT_MARK_SUCCESS = "EDIT_MARK_SUCCESS";

export const addMarkDetailHandler = (id,studentName,activePopup) =>{
    return{
        type:ADD_MARK_DETAIL_INIT,
        id:id,
        studentName : studentName,
        activePopup:activePopup
    }
}

export const addMarkDetailHandlerSuccess = (markApp,id,studentName) =>{
    
    return{
        type:ADD_MARK_DETAIL_SUCCESS,ePopup:markApp.activePopup,
        id:id,
        studentName : studentName,
        activePopup : markApp.activePopup
    }
}

export const addMarkToStudentInit = (editMarkMode,markObject) =>{
    return{
        type : SUBMIT_BUTTON_HANDLER_INIT,
        editMarkMode : editMarkMode,
        markObject : markObject
    }
}
export const addMarkToStudentSuccess = (markApp) =>{
    return{
        type:SUBMIT_BUTTON_HANDLER_SUCCESS,
        editMarkMode : markApp.editMarkMode,
        activePopup:markApp.activePopup,
        markDetail : markApp.markDetail,
        studentId : markApp.studentId,
        studentName : markApp.studentName
    }
}

export const editStudentMarkInit = (editObject)=>{
    return{
        type : EDIT_MARK_INIT,
        editObject : editObject
    }
}

export const editStudentMarkSuccess = (markApp) =>{
    return{
        type : EDIT_MARK_SUCCESS,
        editMarkMode : markApp.editMarkMode,
        activePopup:markApp.activePopup,
        studentMarkObject:markApp.studentMarkObject,
        studentId : markApp.studentId,
        studentName : markApp.studentName
    }
}

// export const addButtonHandlerInit = (semester,studentId,id,subject,marks) =>{
//     return{
//         type : ADD_BUTTON_HANDLER_INIT,
//         semester : semester,
//         studentId : studentId,
//         id : id,
//         subject : subject,
//         mark : marks
//     }
// }
// export const addButtonHandlerSuccess = (markApp) =>{
//     return{
//         type : ADD_BUTTON_HANDLER_SUCCESS,
//         markDetail:markApp.markDetail,

//     }
// }

// export const subractButtonHandlerInit = (studentId,id) =>{
//     return{
//         type:SUBRACT_BUTTON_HANDLER_INIT,
//         studentId : studentId,
//         id:id
//     }
// }
// export const subractButtonHandlerSuccess = (markApp) =>{
//     return{
//         type:SUBRACT_BUTTON_HANDLER_SUCCESS,
//         markDetail:markApp.markDetail
//     }
// }
const initialState = {
    activePopup : false,
    studentMarkObject : {},
    editMarkMode : false,
    markDetail : [],
    studentId : "",
    studentName : ""
}

const markReducer = (state=initialState,action) =>{
    switch(action.type){
        case ADD_MARK_DETAIL_SUCCESS : 
        return{
            ...state,
            activePopup : action.activePopup,
            studentId:action.id,
            studentName : action.studentName
            
        }
        case SUBMIT_BUTTON_HANDLER_SUCCESS:
            return{
                ...state,
            editMarkMode : action.editMarkMode,
            activePopup : action.activePopup,
            markDetail : action.markDetail,
            studentId : action.studentId,
            studentName : action.studentName    
        }
        case EDIT_MARK_SUCCESS :
            return{
                ...state,
                editMarkMode : action.editMarkMode,
                activePopup:action.activePopup,
                studentMarkObject : action.studentMarkObject,
                studentId : action.studentId,
                studentName : action.studentName 
            }
        default : 
        return state
    }
}
export default markReducer;