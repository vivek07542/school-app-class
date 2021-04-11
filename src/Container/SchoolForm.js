import React, { Component } from 'react'
import {connect} from "react-redux";
import StudentForm from "../Component/StudentForm/StudentForm"
import MarkDetail from "../Component/MarkDetail/MarkDetail"
import StudentSummary from "../Component/StudentSummary/StudentSummary"
import MarkSummary from "../Component/MarkSummary/MarkSummary";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import * as formAction from "../Store/Redux/reducer";
class SchoolForm extends Component {
    
    componentDidMount(){
        this.props.onInitilizing();
    }
    render() {
        return (
            <div className="container px-5">
                <h2 className = "pl-lg-5">School Admission Form</h2>
                <StudentForm 
                submitForm = {this.props.onSubmitForm}
                editStudentDetailMode = {this.props.editStudentDetailMode} 
                editStudentDetailModeObject ={this.props.editStudentDetailModeObject}
                initState = {this.props.initState}
                />
                {this.props.studentDetail.length !== 0 ? 
                <StudentSummary 
                studentDetail = {this.props.studentDetail}
                /> : 
                null }
                {this.props.activePopup ? 
                <MarkDetail
                 activePopup = {this.props.activePopup}
                 studentId = {this.props.studentId}
                 studentName = {this.props.studentName}   
                 editMarkMode = {this.props.editMarkMode}
                 studentMarkObject = {this.props.studentMarkObject}
                 /> : null}
                 {this.props.markDetail.length !== 0 ? 
                <MarkSummary
                 markDetail = {this.props.markDetail}
                /> : null}
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        editStudentDetailMode : state.reducer.editStudentDetailMode,
        editStudentDetailModeObject : state.reducer.editStudentDetailModeObject,
        studentDetail : state.reducer.studentDetail,
        initState : state.reducer.initState,
        editMarkMode : state.MarkReducer.editMarkMode,

        addButtonDisable : state.MarkReducer.addButtonDisable,
        activePopup : state.MarkReducer.activePopup,
        studentMarkObject : state.MarkReducer.studentMarkObject,
        studentId : state.MarkReducer.studentId,
        studentName : state.MarkReducer.studentName,
        markDetail : state.MarkReducer.markDetail
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onInitilizing : ()=>{dispatch(formAction.initilizerHandler())},
        onSubmitForm : (editStudentDetailMode,studentDetailObject)=>{dispatch(formAction.submitFormHandler(editStudentDetailMode,studentDetailObject))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SchoolForm);
