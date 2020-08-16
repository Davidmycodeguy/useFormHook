


# react-useformhook-pro
Best react form library of 2020. V 1.0 

How I believe forms should work AS A UX perspective. 

Premise 1. A form can be invalid, but we don't interrupt the user and show an error to the user until he completed his entry. 

Premise 2. disable Form until the form Feilds are valid, making it clear that there a mistake in the Form. 

To accomplish this, we take the following steps:
1. Form field validity should be tested on every change and blur.
2. Form field Errors message should NOT appear as the user is typing.  
3. The form field Error message should be displayed after the user stops typing for 3 seconds (debounce) or  clicks out of the input (on blur).
4. Form buttons have logic to check all fields are valid before enabling the button.


# How I believe forms should work from a developer perspective. 

 The code is super lightweight. 

- .4kB MINIFIED 
- 708B MINIFIED + GZIPPED

The validations are easy just one line a regex pattern (add pattern attribute to input)

    <input
    	name="email"
    	onBlur={handleInputChange}
    	onChange={handleInputChange}
    	pattern="\S+@\S+\.\S+"
    	value={values.email}
    	/>

Prevent users from entering certain characters with just one line regex pattern. (add data-dontallow attribute to input)

    <input
    data-dontallow="[0-9]"
    name="numbersOnly"
    onBlur={handleInputChange}
    onChange={handleInputChange}
    value={values.numbersOnly}
    />

 Easy to read. Lighting bug-free development
 Validate forms with one line regex pattern vs. 100 lines of code.

Form Valuations and key prevention is less than one l line per input. 

Code Sandbox 
https://codesandbox.io/s/laughing-brook-eszw7?file=/src/App.js:647-1123

# Quick guide. 
Insall the package.

    npm i -s react-useformhook-pro 
    


call in hook in the component

	import useForm from 'react-useformhook-pro';

	const { errors,
	setErrors,
	formSubmit,
	handleInputChange,
	isFormValid,
	isValid,
	setFieldValid,
	setValues,
	values} = useForm()

Optional: set initial values and valid states.  

	useForm = (
	initialValues = {email:"test@gmail.com", name:"test"},
	initialValidty = {email:true,name:false}
	)

attach the handle handleInputChange,values,name and regex pattern to your component
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


Lastly, only enable the Form when it's valid. 

	<button disabled={!isFormValid}> Submit Form </button>




