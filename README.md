# useFormHook
Best react form library of 2020. V 1.0 

How I belive forms should work AS A UX pespective . 

1. Form field validity should be tested on every change and blur.
2. Form validity Errors message should not appear as the user is typeing. 
3. Form validity Errors message should appear after user stops typeing for 3 seconds or on blur (clicks outinput).
4. Form Buttom should be disabled unless all fields are valid.

How i beilve forms should work as a devloper perpective.

# useFormHook
Best react form library of 2020. V 1.0 

How I believe forms should work as a user experience perspective. 

1. Form field validity should be tested on every change and blur.
2. Form validity Errors message should not appear as the user is typing. 
3. The form validity Error message should appear after the user stops typing for 3 seconds or on blur (clicks output).
4. Form Button should be disabled unless all fields are valid.

# How I believe forms should work from a developer perspective. 


# The code is super lightweight. 
 .4kB MINIFIED
708B MINIFIED + GZIPPED	

# The validations are easy just past a regex pattern
   <input
         name="email"
         onBlur={handleInputChange}
         onChange={handleInputChange}
         pattern="\S+@\S+\.\S+"
         value={values.email}
      />

# Can easily  block a user from typing characters regex patterns.
    <input
                data-dontallow="[0-9]"
                name="numbersOnly"
                onBlur={handleInputChange}
                onChange={handleInputChange}
                value={values.numbersOnly}
            />

# Fast devlopment only one line is needed to add form feild validations and prevent regex patterns
Form Valuations and key prevention is less than one l line per input. 

Code Sandbox 
https://codesandbox.io/s/laughing-brook-eszw7?file=/src/App.js:647-1123

# Quick guide. 

import useForm from 'react-useformhook-pro';

call in component

const { errors,
	 setErrors,
	 formSubmit,
	 handleInputChange,
	 isFormValid,
	 isValid,
	 setFieldValid,
	 setValues,
	 values} = useForm()

Optional set intal values and valid states.  
 useForm = (
	 initialValues = {email:"test@gmail.com", name:"test"},
	 initialValidty = {email:true,name:false}
	)

attach the handle handleInputChange  values to your component and regex pattern 

    <input
         name="email"
         onChange={handleInputChange}
         pattern="\S+@\S+\.\S+"
         value={values.email}
            />

Display errors.
 <p> {errors.email&& "please enter a valid email" } </p>

Optional, don't allow specific values with regex patterns. 

    <input
         name="email"
         onChange={handleInputChange}
         pattern="\S+@\S+\.\S+"
         value={values.email}
 data-dontallow="[0-9]"
            />

