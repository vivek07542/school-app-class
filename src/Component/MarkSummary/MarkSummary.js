import React, { Component } from 'react';
import { connect } from "react-redux";
import * as markAction from "../../Store/Redux/MarkReducer";

class MarkSummary extends Component {
    editStudentMark=(details,index,key) =>{
        this.props.onEditStudentMark(details);
    }
    render() {
        let markSummary = (
            this.props.markDetail.map(details =>{
                return(
                    <div className="col-sm-6" key ={details.studentId}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{`${details.studentName} Mark's`}</h5>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Subject</th>
                                        <th>Marks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details.marks.map(score => {
                                        return (
                                        <tr key = {score.id}>
                                            <td>{score.id}</td>
                                            <td>{score.subject}</td>
                                            <td>{score.markObtained}</td>
                                        </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <button className="btn btn-outline-primary" onClick ={(index,key)=>this.editStudentMark(details,index,key)}>Edit</button>
                        </div>
                    </div>
                </div>
                )
            })
           
        )
        return (
            <div className="mt-5">
                <h3>Student Marks Summary</h3>
                <div className="row">
                    {markSummary}
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onEditStudentMark : (editObject) =>{dispatch(markAction.editStudentMarkInit(editObject))}
    }
}
export default connect(null,mapDispatchToProps)(MarkSummary);