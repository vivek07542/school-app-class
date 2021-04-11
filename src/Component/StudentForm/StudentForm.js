import React, { Component } from 'react';
import Input from "../../UI/Input/Input";
import {checkValidatity} from "../../Utilities/validity";

export default class StudentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            studentDetail: {
                firstName: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'First Name',
                    },
                    className: "form-control mb-2",
                    value: "",
                    label: "First name",
                    validation:{
                        required : true
                    },
                    valid:false,
                    touched :false
                },
                lastName: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Last Name',
                    },
                    className: "form-control mb-2",
                    value: "",
                    label: "Last name",
                    validation:{
                        required : true
                    },
                    valid:false,
                    touched :false
                },
                gender: {
                    elementType : "select",
                    elementConfig : {
                        placeholder: "Select Gender",
                      options:[
                      { name : "Male"},
                      { name : "Female"},]
                    },
                    className:"form-control mb-2",
                    label : "Gender",
                    value: "--Choose Gender--",
                    valid:false,
                    validation:{},
                    touched :false
                },
                street: {
                    elementType: "textarea",
                    elementConfig: {
                        type: "text",
                        placeholder: "Street",
                    },
                    className: "form-control mb-2",
                    value: "",
                    label: "Street",
                    validation:{
                        required : true
                    },
                    valid:false,
                    touched :false
                },
                country: {
                    elementType: "select",
                    elementConfig: {
                        placeholder: "Country",
                        options:[]
                    },
                    className: "form-control mb-2",
                    label: "Country",
                    value : "--Choose Country--",
                    validation:{
                        required : true
                    },
                    valid:false,
                    touched :false
    
                },
                state: {
                    elementType: "select",
                    elementConfig: {
                        placeholder: "State",
                        options:[]                    
                    },
                    className: "form-control mb-2",
                    label: "State",
                    value : "--Choose State--",
                    validation:{
                        required : true
                    },
                    valid:false,
                    touched :false
                },
                city: {
                    elementType: "citySel",
                    elementConfig: {
                        placeholder: "City",
                        options : []
                    },
                    className: "form-control mb-2",
                    label: "City",
                    value : "--Choose City--",
                    validation:{
                        required : true
                    },
                    valid:false,
                    touched :false
                },
                mobileNumber: {
                    elementType: "input",
                    elementConfig: {
                        type: "number",
                        placeholder: "Mobile Number",
                    },
                    className: "form-control mb-2",
                    value: "",
                    label: "Mobile Number",
                    validation:{
                        required : true,
                        absolute : 10
                    },
                    valid:false,
                    touched :false
    
                },
                email: {
                    elementType: "input",
                    elementConfig: {
                        type: "email",
                        placeholder: "Your E-Mail",
                    },
                    className: "form-control mb-2",
                    value: "",
                    label: "E-Mail Address ",
                    validation:{
                        required : true,
                        isEmail:true
                    },
                    valid:false,
                    touched :false
                }
            },
            formIsValid: false,
            editStudentDetailMode : false,
            id : null
        } 
    }
    
    componentDidUpdate(){
        this.baseState = {...this.state};
        if(this.state.editStudentDetailMode !== this.props.editStudentDetailMode ){
            const updatedStateEditCondition = {...this.state};
                updatedStateEditCondition.formIsValid = true;
                updatedStateEditCondition.editStudentDetailMode = true;
                updatedStateEditCondition.id = this.props.editStudentDetailModeObject.id;
                this.setState(updatedStateEditCondition);
            const updateStudentDetail = {...this.state.studentDetail};
            const editStudentDetail = this.props.editStudentDetailModeObject;
           
            for(let key in updateStudentDetail){
                for(let property in editStudentDetail){
                    if(key === property){
                        updateStudentDetail[key].value = editStudentDetail[property];
                        updateStudentDetail[key].touched = true;
                        updateStudentDetail[key].valid = true;
                    }
                } 
            }

            this.setState({studentDetail:updateStudentDetail});
        }
    }

    componentDidMount() {
        const updatedstudentDetail = { ...this.state.studentDetail };
        for(let key in updatedstudentDetail){
            if(key === "country"){
                const updatedFormElement = { ...updatedstudentDetail[key]};
                updatedFormElement.elementConfig.options = [
                    {
                        name: 'Germany',
                        states: [
                            { name: 'A', cities: ['Duesseldorf', 'Leinfelden-Echterdingen', 'Eschborn'] }
                        ]
                    },
                    {
                        name: 'Spain',
                        states: [
                            { name: 'B', cities: ['Barcelona'] }
                        ]
                    },
                    {
                        name: 'USA',
                        states: [
                            { name: 'California', cities: ["Los Angeles", "San Diego"] },
                            { name: 'Texas', cities: ["Dallas", "Austin"] },
                        ]
                    },
                    {
                        name: 'Mexico',
                        states: [
                            { name: 'D', cities: ['Puebla'] }
                        ]
                    },
                    {
                        name: 'India',
                        states: [
                            { name: "Assam", cities: ["Dispur", "Guwahati"] },
                            { name: "Gujarat", cities: ["Vadodara", "Surat", "Bharuch"] },
                            { name: "Madhya Pradesh", cities: ["Indore", "Gwalior", "Bhopal", "Guna"] },
                        ]
                    },
                ]
                updatedstudentDetail[key] = updatedFormElement;
                this.setState({studentDetail : updatedstudentDetail});
            }
        }
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedstudentDetail = { ...this.state.studentDetail};
        const updatedFormElement = { ...updatedstudentDetail[inputIdentifier] };
        updatedFormElement.value = event.target.value;
        if (inputIdentifier === "country") {
            this.changeCountry(event,updatedstudentDetail,updatedFormElement);
        }
        else if (inputIdentifier === "state") {
            this.changeState(event,updatedstudentDetail,updatedFormElement);
        }
        updatedFormElement.valid = checkValidatity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedstudentDetail[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for(let inputIdentifier in updatedstudentDetail){
            formIsValid = updatedstudentDetail[inputIdentifier].valid && formIsValid
        }
        this.setState({studentDetail : updatedstudentDetail,formIsValid : formIsValid});
    }
    
    changeCountry = (event,updatedstudentDetail,updatedFormElement) => {
        for(let key in updatedstudentDetail){
            if(key === "state"){
                const updatedFormElementState = { ...updatedstudentDetail[key]};
                updatedFormElementState.elementConfig.options = updatedFormElement.elementConfig.options.find(cntry => cntry.name === event.target.value).states;
                updatedstudentDetail[key] = updatedFormElementState;
                this.setState({studentDetail : updatedstudentDetail});
            }
        }
    }

    changeState = (event,updatedstudentDetail,updatedFormElement) => {
        for(let key in updatedstudentDetail){
            if(key === "city"){
                const updatedFormElementCity = { ...updatedstudentDetail[key]};
                updatedFormElementCity.elementConfig.options = updatedFormElement.elementConfig.options.find(cntry => cntry.name === event.target.value).cities;
                updatedstudentDetail[key] = updatedFormElementCity;
                this.setState({studentDetail : updatedstudentDetail});
            }
        }
    }
    resetForm=()=>{
        const updateStudentDetail = {...this.state};
        for(let key in updateStudentDetail.studentDetail){
            updateStudentDetail.studentDetail[key].valid = false;
            updateStudentDetail.studentDetail[key].touched = false;
            if(key === "gender"){
                updateStudentDetail.studentDetail[key].value = "--Choose Gender--" 
            }        
            else if(key === "country"){
                updateStudentDetail.studentDetail[key].value = "--Choose Country--" 
            }
            else if(key === "state"){
                updateStudentDetail.studentDetail[key].value = "--Choose State--" 
            }
            else if(key === "city"){
                updateStudentDetail.studentDetail[key].value = "--Choose City--" 
            }
            else{
                updateStudentDetail.studentDetail[key].value = " ";
            }    
        }   
        updateStudentDetail.formIsValid = false;
        updateStudentDetail.editStudentDetailMode = false;
        updateStudentDetail.id = null; 
        this.setState(updateStudentDetail);
    }
    submitHandler = (event)=>{
        event.preventDefault();
        const studentData = {};
        studentData.id = this.state.id;
        for(let formIdentifier in this.state.studentDetail){
            studentData[formIdentifier] = this.state.studentDetail[formIdentifier].value;
        }
        this.props.submitForm(this.state.editStudentDetailMode,studentData);
        this.resetForm();
    }
    render() {
        const studentDetailArray = [];
        for (let key in this.state.studentDetail) {
            studentDetailArray.push({
                id: key,
                config: this.state.studentDetail[key]
            })
        }
        let form = (
            <div className="form-group ">
                <form onSubmit={this.submitHandler}>
                    {studentDetailArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            componentClasses = {formElement.config.className}
                            inValid = {!formElement.config.valid}
                            touched ={formElement.config.touched}
                            shouldValidate = {formElement.config.validation}
                            label={formElement.config.label}
                            changed={(event) => { this.inputChangeHandler(event, formElement.id) }}

                        />
                    ))}
                    <div className="row justify-content-center">
                        <button className="btn btn-outline-primary my-3" disabled ={!this.state.formIsValid}>Save form</button>
                    </div>
                </form>
            </div>
        )
        return (
            <div>
                {form}
            </div>
        )
    }
}