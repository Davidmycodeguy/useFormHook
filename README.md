
# react-useformhook-pro
Best react form library of 2020. V 1.0 

How I belive forms should work AS A UX pespective . 

Premise 1. A form can be invalid but we show inturpt show error the user untill he completed his entry. 
Premise 2. disable Form untill the form Feilds are valid maing it clear that there a mistake in the form. 

To accpolish this we take the following steps:
1. Form field validity should be tested on every change and blur.
2. Form field Errors message should NOT appear as the user is typeing.  
3. Form field Errors message should appear after user stops typeing for 3 seconds or on blur (clicks outinput).
4. Form buttuon have logic  to check all fields are valid before enbaleing the button.


# How I believe forms should work from a developer perspective. 

 The code is super lightweight. 

- .4kB MINIFIED 
- 708B MINIFIED + GZIPPED

The validations are easy just one line a regex pattern (add pattren attribute to input)
	<input
	name="email"
	onBlur={handleInputChange}
	onChange={handleInputChange}
	pattern="\S+@\S+\.\S+"
	value={values.email}
	/>

Prevent user entering certain  characters with just one line regex pattern. (add allow data-dontallow)
	<input
	data-dontallow="[0-9]"
	name="numbersOnly"
	onBlur={handleInputChange}
	onChange={handleInputChange}
	value={values.numbersOnly}
	/>

 Fast devlopment and easy to read only one line regex patterns where as ussly might take serval hundrand lines. 
Form Valuations and key prevention is less than one l line per input. 

Code Sandbox 
https://codesandbox.io/s/laughing-brook-eszw7?file=/src/App.js:647-1123

# Quick guide. 

	import useForm from 'react-useformhook-pro';

call in hook in the component

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

attach the handle handleInputChange,values,name and regex pattern to your componen

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


Lastly only enable the form  when its valid. 

	<button disabled={!isFormValid}> Submit Form </button>

