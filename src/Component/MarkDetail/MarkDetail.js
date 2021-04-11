import React, { Component } from 'react'
import "./MarkDetail.css";
import Modal from "../../UI/Modal/Modal";
import { connect } from 'react-redux';
import * as markAction from "../../Store/Redux/MarkReducer";

// import MarkList from "./MarkList/MarkList/MarkList";

class MarkDetail extends Component {
    state = {
        semester: {
            value: "",
            touched: false,
            valid: false
        },
        marks: [
            {
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
            }
        ],
        isValid: false,
        editMarkMode: false,
        studentName : "",
        addBtnDisable : false,
        subBtnDisable : true
    }
    inputHandler = (event) => {
        if (event.target.value >= 0 && event.target.value.trim() !== "") {
            this.setState({
                semester: {
                    value: event.target.value,
                    touched: true,
                    valid: true
                }
            })
        }
        else {
            this.setState({
                semester: {
                    value: event.target.value,
                    touched: true,
                    valid: false
                }
            })
        }
    }
    addButtonHandler = () => {
        const values = [...this.state.marks];
        
        if(values.length <=4){
            this.setState({ marks:
                [...this.state.marks,
                {
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
                }
            ],
            addBtnDisable : false,
            subBtnDisable : false})
        }
        else {
            this.setState({
                marks:
                    [...this.state.marks,
                    {
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
                    }
                ],
                addBtnDisable : true,
                subBtnDisable : false
            })
        }
    }
    subractButtonHandler = (index) => {
        const values = [...this.state.marks];
        if(values.length === 1){
            this.setState({addBtnDisable : false,subBtnDisable : true})
        }
        else{
            values.splice(index, 1);
            this.setState({ marks: values,subBtnDisable:false,addBtnDisable:false})
        }
    }
    onChangeHandler = (index, event) => {
        const subjectMark = [...this.state.marks];
        if (event.target.value >= 0 && event.target.value < 101 && event.target.value.trim() !== "" && event.target.name === "markObtained") {
            subjectMark[index][event.target.name].value = event.target.value;
            subjectMark[index][event.target.name].touched = true;
            subjectMark[index][event.target.name].valid = true
        }
        else if (event.target.value.trim() !== "" && event.target.name === "subject") {
            subjectMark[index][event.target.name].value = event.target.value;
            subjectMark[index][event.target.name].touched = true;
            subjectMark[index][event.target.name].valid = true
        }
        else {
            subjectMark[index][event.target.name].value = event.target.value;
            subjectMark[index][event.target.name].touched = true;
            subjectMark[index][event.target.name].valid = false
        }
        this.setState({ marks: subjectMark }, () => this.validityCheck(event));
    }
    validityCheck = (event) => {
        let formIsValid = true;
        let formValidityCheck = { ...this.state.marks }
        for (let inputIdentifier in formValidityCheck) {
            formIsValid = this.state.semester.valid && formValidityCheck[inputIdentifier].subject.valid && formValidityCheck[inputIdentifier].markObtained.valid && formIsValid
        }
        this.setState({ isValid: formIsValid });
    }
    addMarkToStudent = (event) => {
        event.preventDefault();
        const markData = {};
        markData.studentId = this.props.studentId;
        markData.studentName = this.props.studentName;
        markData.semester = this.state.semester.value;
        markData.marks = [];
        for (let index in this.state.marks) {
            let object = {};
            object.id = +index + 1;
            object.subject = this.state.marks[index].subject.value;
            object.markObtained = this.state.marks[index].markObtained.value;
            markData.marks.push(object);
        }
        this.props.onAddMarkToStudent(this.state.editMarkMode, markData);
        this.resetState();
    }
    resetState =() =>{
        this.setState({
            semester: {
                value: "",
                touched: false,
                valid: false
            },
            marks: [
                {
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
                }
            ],
            isValid: false,
            editMarkMode: false,
            studentName : "",
            addBtnDisable : false,
            subBtnDisable : true
        })
    }
    componentDidMount() {
        let object = {...this.state};
        object.studentName = this.props.studentName;
        this.setState(object);
        if (this.state.editMarkMode !== this.props.editMarkMode) {
            if (this.props.studentMarkObject !== null) {
                const updatedStateEditCondition = { ...this.state };
                updatedStateEditCondition.isValid = true;
                updatedStateEditCondition.editMarkMode = true;
                updatedStateEditCondition.studentName = this.props.studentName;
                updatedStateEditCondition.semester.value = this.props.studentMarkObject.semester;
                updatedStateEditCondition.semester.touched = true;
                updatedStateEditCondition.semester.valid = true;
                this.setState(updatedStateEditCondition);

                let array = [];

                let editMarks = this.props.studentMarkObject.marks;

                for(let index in editMarks){
                    let object = {};
                    object.subject = {}
                    object.subject.value = editMarks[index].subject;
                    object.subject.touched = true;
                    object.subject.valid = true;
                    object.markObtained = {};
                    object.markObtained.value = editMarks[index].markObtained
                    object.markObtained.touched = true;
                    object.markObtained.valid = true;
                    array.push(object);
                }
                
                this.setState({marks:array});
            }
        }
    }

    render() {
        const inputClasses = ["form-control mb-2"];
        if (this.state.semester.valid && this.state.semester.touched) {
            inputClasses.push("is-valid");
        }

        if (!this.state.semester.valid && this.state.semester.touched) {
            inputClasses.push("is-invalid");
        }
        // let studentMark = this.props.studentMarkObject;
        let markContentDetail = (
            <div className="form-group">
                <form onSubmit={this.addMarkToStudent}>
                    <p>{this.state.studentName}</p>
                    <div className="form-row Input justify-content-center align-items-start ">
                        <div className="col-md-12 mb-2 form-inline ">
                            <label className="col-5">Semester :</label>
                            <input type="number"
                                placeholder="Semester"
                                className={inputClasses.join(' ')}
                                name="semester"
                                value={this.state.semester.value}
                                onChange={this.inputHandler}
                            />
                        </div>
                    </div>
                    <h3>Marks Detail</h3>
                    {this.state.marks.map((e, index) => {

                        const inputClasse = ["col-3 form-control mb-2"];
                        if (e.subject.valid && e.subject.touched) {
                            inputClasse.push("is-valid");
                        }
                        if (!e.subject.valid && e.subject.touched) {
                            inputClasse.push("is-invalid");
                        }
                        const inputClass = ["col-3 form-control mb-2"]

                        if (e.markObtained.valid && e.markObtained.touched) {
                            inputClass.push("is-valid");
                        }
                        if (!e.markObtained.valid && e.markObtained.touched) {
                            inputClass.push("is-invalid");
                        }
                        return (
                            <div className="form-row Input justify-content-between align-items-center" key={index}>
                                <div className="col-md-12 mb-1 form-inline justify-content-between ">
                                    <label className="col-2 mb-2">Subject :</label>
                                    <select
                                        className={inputClasse.join(' ')}
                                        name="subject"
                                        value={e.subject.value}
                                        onChange={(event) => this.onChangeHandler(index, event)} >
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
                                    <input
                                        className={inputClass.join(' ')}
                                        type="number"
                                        name="markObtained"
                                        placeholder="Marks"
                                        value={e.markObtained.value}
                                        onChange={(event) => this.onChangeHandler(index, event)} />
                                    <button type="button" className="btn btn-outline-primary mb-2 col-1" disabled = {this.state.addBtnDisable} onClick={() => this.addButtonHandler()}>+</button>
                                    <button type="button" className="btn btn-outline-primary mb-2 col-1" disabled = {this.state.subBtnDisable} onClick={() => this.subractButtonHandler(index)}>-</button>
                                </div>
                            </div>
                        )
                    })}
                    <div className="row justify-content-center">
                        <button className="btn btn-outline-primary my-3" disabled={!this.state.isValid}>Save Marks</button>
                    </div>
                </form>
            </div>
        )
        return (
            <>
                <Modal show={this.props.activePopup}>
                    {markContentDetail}
                </Modal>
            </>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddMarkToStudent: (editMarkMode, markObject) => { dispatch(markAction.addMarkToStudentInit(editMarkMode, markObject)) }
    }
}
export default connect(null, mapDispatchToProps)(MarkDetail);