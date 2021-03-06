/* eslint-disable no-return-assign */
/* eslint-disable max-len */
import { useState } from 'react';

const setKeysToFalse = (jsonObject) => {
    const newisValidObj = { ...jsonObject };
    Object.keys(newisValidObj).forEach((value) => (newisValidObj[value] = false));
    return newisValidObj;
};

const removedNotAllowedValues = (value, notAllowedRegexString) => {
    let newVaue = value;
    if (notAllowedRegexString) {
        const notAllowedRegex = new RegExp(notAllowedRegexString, 'g');
        newVaue = newVaue.replace(notAllowedRegex, '');
    }
    return newVaue;
};

const validateRegex = (value, pattern) => {
    if (pattern) {
        const validRegex = new RegExp(pattern, 'g');
        const valid = validRegex.test(value);
        return valid;
    }
    return true;
};

const setFormInitValidity = (initialValidtyObj) => Object.values(initialValidtyObj).every((item) => item);

// eslint-disable-next-line max-lines-per-function
export const useForm = (
    initialValues = {},
    initialValidty = setKeysToFalse(initialValues)
) => {
    const [values, setValues] = useState(initialValues);
    const [isValid, setFieldValid] = useState(initialValidty);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(setFormInitValidity(initialValidty));
    const [submitCount, setSubmitCount] = useState(false);
    const [timeOuts,setTimeOuts]=useState({});



    // --
    // eslint-disable-next-line max-statements
    const handleInputChange = (event) => {
    // Fetch needed attribute of targeted element
        const { name, value, pattern } = event.target;

        // If unwanted key is pressed then remove not allowed value and update value
        const dontAllow = event.target.getAttribute('data-dontallow');
        const newValue = removedNotAllowedValues(value, dontAllow);

        // Update value in state
        setValues({ ...values, [name]: newValue });

        //update Errors to true
        //setErrors({ ...errors, [name]: undefined });

        const isValueValid = validateRegex(newValue, pattern);
        const newisValidObj = { ...isValid, [name]: isValueValid };
        //if (isValueValid) {
            setFieldValid(newisValidObj);
            setErrors({ ...errors, [name]: undefined });
        //}
        if(timeOuts[name]){
            clearTimeout(timeOuts[name]);
        }
        if (event.type === 'blur') {
            // --
            setFieldValid(newisValidObj);
            const error = (newValue.length && !isValueValid) || false;
            if (error) {
                setErrors({ ...errors, [name]: error });
            } else {
                const newErrorState = { ...errors };
                delete newErrorState[name];
                setErrors({ ...newErrorState });
            }
        } else {
            setTimeOuts({...timeOuts,[name]:setTimeout(()=>{
                
                setFieldValid(newisValidObj);
                const error = (newValue.length && !isValueValid) || false;
                if (error) {
                    setErrors({ ...errors, [name]: error });
                } else {
                    const newErrorState = { ...errors };
                    delete newErrorState[name];
                    setErrors({ ...newErrorState });
                } 
                setTimeOuts({...timeOuts,[name]:null})},3000)
            })
        }
        const allValid = Object.values(newisValidObj).every(Boolean);
        setIsFormValid(allValid);
    };

    const formSubmit = (event, customCallBack) => {
        if (event) event.preventDefault();
        if (isFormValid) {
            // eslint-disable-next-line no-magic-numbers
            const newSubmitCount = submitCount + 1;
            setSubmitCount({ submitCount: newSubmitCount });
            if (customCallBack) {
                customCallBack();
            }
        }
    };

    return {
        errors,
        setErrors,
        formSubmit,
        handleInputChange,
        isFormValid,
        isValid,
        setFieldValid,
        setValues,
        values
    };
};

export default useForm;
