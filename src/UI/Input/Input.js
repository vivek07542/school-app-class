import React, { Component } from "react";
// import DropDown from "../DropDown/DropDown";
import "./Input.css";

class Input extends Component{
    render(){
        let inputElement = null;
        let validationError = null;
        const inputClasses = [this.props.componentClasses];
        if(this.props.inValid && this.props.shouldValidate && this.props.touched){
            inputClasses.push("is-invalid");
            validationError = <p className = "invalid-feedback">Please Enter a Valid Value !</p>
        }
        if(!this.props.inValid && this.props.shouldValidate && this.props.touched){
            inputClasses.push("is-valid");
            validationError = <p className = "valid-feedback">Looks Good!</p>
        }
        switch (this.props.elementType) {
            case ("input"):
                inputElement = <input 
                 onChange = {this.props.changed}
                    className = {inputClasses.join(' ')}
                  {...this.props.elementConfig}
                    value={this.props.value}
                />
                break
            case ("textarea"):
                inputElement = 
                <textarea
                 onChange = {this.props.changed}
                 {...this.props.elementConfig}
                   className = {inputClasses.join(' ')} 
                   value={this.props.value}
                />
                break
                case ("select"):
                    inputElement =
                    <select   value={this.props.value} onChange={this.props.changed} className = {inputClasses.join(' ')} {...this.props.elementConfig}>
                    <option>{this.props.value}</option>
                    {this.props.elementConfig.options.map((e, key) => {
                        return <option key={key} value={e.name}>{e.name}</option>;
                    })}
                    </select>
                break
                case ("citySel"):
                    inputElement =
                    <select value= {this.props.value} onChange={this.props.changed} className = {inputClasses.join(' ')} {...this.props.elementConfig}>
                    <option>{this.props.value}</option>
                         {this.props.elementConfig.options.map((e, key) => {
                          return <option key={key} value={e}>{e}</option>;
                    })}
                    </select>
                break
            default:
                inputElement = <input onChange = {this.props.changed} {...this.props.elementConfig}
                    value={this.props.value}
                />
        }
        return(
            <div className="form-row Input justify-content-center align-items-start ">
            <div className="col-md-4 mb-1 form-inline ">
                    <div className="col-5">
                        <label>{this.props.label}</label>
                    </div>
                    <div className="col-7">
                         {inputElement}
                         {validationError}
                    </div>
            </div>
        </div>

        )
    }
} 
   
//     return (
//         <div className="form-row justify-content-center align-items-start ">
//             <div className="col-md-4 mb-1 form-inline">
//                     <div className="col-5">
//                         <label>{props.label}</label>
//                     </div>
//                     <div className="col-7">
//                          {inputElement}
//                     </div>
//             </div>
//         </div>

//     )
// }
export default Input;