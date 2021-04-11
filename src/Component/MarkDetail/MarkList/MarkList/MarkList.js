import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as markAction from "../../../../Store/Redux/MarkReducer";

class MarkList extends Component {
    state = {
        subject: {
            value: "",
            touched: false,
            valid: false
        },
        markObtained: {
            value: "",
            touched: false,
            valid: false
        },
        isValid : true
    }
    selectSubject = (event) => {
        if(event.target.value.trim() !== "" ){
            this.setState({
                subject : {
                value :  event.target.value,
                touched : true,
                valid : true
            }})
        }
        else{
            this.setState({
                subject : {
                value :  event.target.value,
                touched : true,
                valid:false
            }})
        }
    }
    inputMarkHandler = (event) => {
        if (event.target.value >= 0 && event.target.value < 101 &&  event.target.value.trim() !== "") {
            this.setState({
                markObtained : {
                value :  event.target.value,
                touched : true,
                valid : true
            }})
            this.props.selectValue(this.state.subject.value)
        }
        else{
            this.setState({
                markObtained : {
                value :  event.target.value,
                touched : true,
                valid:false
            }})
        }
    }
    resetState = () => {
        this.setState({
            subject: {
                value: "",
                touched: false,
                valid: false
            },
            markObtained: {
                value: "",
                touched: false,
                valid: false
            }
        })
    }
    addButtonHandler = () => {
        this.props.onAddButtonHandler(this.props.semester, this.props.studentId, this.props.id, this.state.subject.value, this.state.markObtained.value);
    }

    subractButtonHandler = () => {
        this.props.onSubractButtonHandler(this.props.studentId, this.props.id);
    }
    
    render() {
        const inputClasses = ["col-3 form-control mb-2"];
        if(this.state.subject.valid && this.state.subject.touched){
            inputClasses.push("is-valid");
        }
        if(!this.state.subject.valid  && this.state.subject.touched ){
            inputClasses.push("is-invalid");
        }
        const inputClass = ["col-3 form-control mb-2"]

        if(this.state.markObtained.valid && this.state.markObtained.touched ){
            inputClass.push("is-valid");
        }
        if(!this.state.markObtained.valid  && this.state.markObtained.touched ){
            inputClass.push("is-invalid");
        }
        return (
            <div className="form-row Input justify-content-between align-items-center ">
                <div className="col-md-12 mb-1 form-inline justify-content-between ">
                    <label className="col-2 mb-2">Subject :</label>
                    <select className={inputClasses.join(' ')} onChange={this.selectSubject} value={this.state.subject.value}>
                        <option value="" disabled >Select Subject</option>
                        <option value="Physics"> Physics</option>
                        <option value="Mathamatics"> Mathamatics</option>
                        <option value="Chemistry">Chemistry </option>
                        <option value="Economics"> Economics</option>
                        <option value="Taxation"> Taxation</option>
                        <option value="Accounts">Accounts </option>
                        <option value="Moral Values">Moral Values </option>
                        <option value="History">History </option>
                    </select>
                    <input className={inputClass.join(' ')} 
                    type="number" 
                    placeholder="Marks" 
                    value={this.state.markObtained.value} 
                    onChange={this.inputMarkHandler} />
                    <button className="btn btn-outline-primary mb-2 col-1" onClick={this.addButtonHandler}>+</button>
                    <button className="btn btn-outline-primary mb-2 col-1" onClick={this.subractButtonHandler}>-</button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddButtonHandler: (semester, studentId, id, subject, markObtained) => { dispatch(markAction.addButtonHandlerInit(semester, studentId, id, subject, markObtained)) },
        onSubractButtonHandler: (studentId, id) => { dispatch(markAction.subractButtonHandlerInit(studentId, id)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MarkList)