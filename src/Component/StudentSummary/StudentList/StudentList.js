import React, { Component } from 'react'

export default class StudentList extends Component {
    state = {
        activePopup: false,
        editStudentDetailMode: false,
        editStudentDetailModeObject: {},
        editStudentMarksMode: false,
        addButtonDisable : false,
    }

    editHandler = () => {
        // State Does Not update Soon as asynchronous for that we have to write callback of updated state
        this.setState({ editStudentDetailMode: true }, () => {
            this.props.editClick(this.props.id, this.state.editStudentDetailMode)
        });
    }
    deleteHandler = ()=>{
        this.props.deleteClick(this.props.id);
    }
    addClickHandler = () =>{
        // State Does Not update Soon as asynchronous for that we have to write callback of updated state
        this.setState({activePopup : true},()=>{
            this.props.addClick(this.props.id,this.props.studentName,this.state.activePopup)
        });
    }
    render() {
        let eachChild = (
            <tr key={this.props.id}>
                <td>{`enrol${this.props.id}`}</td>
                <td>{this.props.studentName}</td>
                <td>{this.props.gender}</td>
                <td>{this.props.address}</td>
                <td>{this.props.country}</td>
                <td>{this.props.state}</td>
                <td>{this.props.city}</td>
                <td>{this.props.mobileNumber}</td>
                <td>{this.props.email}</td>
                <td>
                    <button className="btn btn-outline-primary btn-sm" onClick = {this.editHandler}>Edit</button>
                    <button className="btn btn-outline-primary btn-sm" onClick = {this.deleteHandler}>Delete</button>
                    <button className="btn btn-outline-primary btn-sm" disabled = {this.state.addButtonDisable} onClick = {this.addClickHandler}>Add Marks</button>
                </td>
            </tr>
        )
        return (
            <>
                <tbody>
                    {eachChild}
                </tbody>
            </>
        )
    }
}