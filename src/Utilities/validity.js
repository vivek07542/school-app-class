export const checkValidatity=(value,rules)=>{
    let isValid = true;

    if(rules.required){
        isValid = value.trim() !=='' && isValid;
    }
    if(rules.absolute){
        isValid = value.length === rules.absolute && isValid;
    }
    if(!rules){
        return true;
    }
    if(rules.isEmail){
        const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        isValid = pattern.test(value) && isValid;
    }
    if(rules.isNumeric){
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
    }
    return isValid;
}