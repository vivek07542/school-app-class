import React, { Component } from 'react'
import StudentList from "./StudentList/StudentList"
import {connect} from "react-redux";
import * as formAction from "../../Store/Redux/reducer"
import * as markAction from "../../Store/Redux/MarkReducer";
import "./StudentSummary.css";
class StudentSummary extends Component {
    render() {
        let student = (
            this.props.studentDetail.map(details =>{
                return(
                    <StudentList 
                    key = {details.id}
                    id = {details.id}
                    studentName = {`${details.firstName} ${details.lastName}`}
                    gender = {details.gender}
                    address = {details.street}
                    country = {details.country}
                    state = {details.state}
                    city = {details.city}
                    mobileNumber = {details.mobileNumber}
                    email = {details.email}
                    editClick = {this.props.onEditStudentDetailHandler}
                    deleteClick = {this.props.onDeleteStudentDetailHandler}
                    addClick = {this.props.onAddMarkDetailHandler}
                
                />
                )
            })
        )
        return (
            <div className="StudentSummary">
                 <h1>Student Summary </h1>
                 <table className="table table-striped">
                 <thead>
                    <tr>
                        <th>Id</th>
                        <th>Student Name</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Country</th>
                        <th>State</th>
                        <th>City</th>
                        <th>Mobile Number</th>
                        <th>E-mail</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {student}
                 </table>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        activePopup : state.MarkReducer.activePopup,
        editStudentDetailMode : state.reducer.editStudentDetailMode,
        markDetail : state.reducer.markDetail
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onEditStudentDetailHandler : (id,editStudentDetailMode)=>{dispatch(formAction.editStudentDetailHandler(id,editStudentDetailMode))},
        onDeleteStudentDetailHandler : (id)=>{dispatch(formAction.deleteStudentDetailHandler(id))},
        onAddMarkDetailHandler : (id,studentName,activePopup)=>{dispatch(markAction.addMarkDetailHandler(id,studentName,activePopup))},
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(StudentSummary)
