


# react-useformhook-pro
Best react form library of 2020. V 1.0 
https://www.youtube.com/watch?v=CcPajbjT6Zw

How I believe forms should from  A UX perspective.  

Premise 1. Make the user feel at ease 
Please Don't Interrupt the user with show error to the user until he completed his entry. It Slows down the user and might make them feel attacked.  

The form field Error message should be displayed after clicks out of the input (on blur).
Another annoyance is that with this user might think everything is right but clicks out; then he says error. This slow feedback might upset the user, so we have to add one more thing called debounce.  When the user stops typing for 3 seconds (debounce), then we can. 
 
Also, Technically keep in mind that.  
A form can be invalid and not show errors. For example, the initial start position doesn't have anything filled out. It's not valid, but we don't want to show the mistakes on the default state. Form field validity should be tested on every change and blur.

Premise 2. Make it impossible to get wrong.
Disable Form until the form Feilds are valid, making it clear that there a mistake in the Form. 



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
Install the package.

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





How i believe forms should work as a developer perspective.

# useFormHook
Best react form library of 2020. V 1.0 

How I believe forms should work as a user experience perspective. 

1. Form field validity should be tested on every change and blur.
2. Form validity Errors message should not appear as the user is typing. 
3. The form validity Error message should appear after the user stops typing for 3 seconds or on blur (clicks output).
4. Form Button should be disabled unless all fields are valid.

# How I believe forms should work from a developer perspective. 


# The code is super lightweight. 

 - .4kB MINIFIED 
 - 708B MINIFIED + GZIPPED

# The validations are easy just past a regex pattern
   <input
         name="email"
         onBlur={handleInputChange}
         onChange={handleInputChange}
         pattern="\S+@\S+\.\S+"
         value={values.email}
      />

# Can easily block a user from typing characters regex patterns.
    <input
                data-dontallow="[0-9]"
                name="numbersOnly"
                onBlur={handleInputChange}
                onChange={handleInputChange}
                value={values.numbersOnly}
            />

# Fast development only one line is needed to add form field validations and prevent regex patterns
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
	    
	    
Lastly, only enable the Form when it's valid. 

    <button disabled={!isFormValid}> Submit Form </button>

