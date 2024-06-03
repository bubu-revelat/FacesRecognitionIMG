import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PopUp from "../PopUp/PopUp";
import endpoint from '../../endpoint';


function Register() {
    let navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [email, onEmailChange] = useState(null)
    const [password, onPasswordChange] = useState(null)
    const [name, onNameChange] = useState(null)


    const toggleModal = () => {
        setIsOpen(!isOpen);
    };


    function isValidPassword(password) {
        // Define password requirements
        const minLength = 8;
        const maxLength = 20;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

        // Check if password meets all requirements
        if (
            password.length >= minLength &&
            password.length <= maxLength &&
            hasUppercase &&
            hasLowercase &&
            hasNumber &&
            hasSpecialChar
        ) {
            return true;
        } else {
            return false;
        }
    }

    function isValidEmail(email) {
        // Regular expression pattern for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Check if the email matches the pattern
        return emailRegex.test(email);
    }

    function isValidName(name) {
        if (name !== '' &&
            name !== undefined &&
            name?.length > 2)
            return true;


        return false;
    }

    const handleSignUp = async () => {
        

        if (isValidEmail(email) && isValidPassword(password) && isValidName(name)) {
            let payload = {
                email: email,
                password: password,
                name: name
            }
            const register = await fetch(endpoint.url + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (register) {
                const response = await register.json();
                if (response?.result) {
                    navigate('/');
                } else {
                    alert(response?.message)
                }
            }
        } else {
            toggleModal();
        }
    };

    const handleSignIn = ()=>{
        navigate('/');
    }


    const handleEmailChange = (event) => {
        onEmailChange(event.target.value);
    };


    const handlePasswordChange = (event) => {
        onPasswordChange(event.target.value);
    }

    const handleNameChange = (event) => {
        onNameChange(event.target.value);
    }

    return (

        <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
            <main className="pa4 black-80">
                <PopUp isOpen={isOpen} onClose={toggleModal} text='Oops! It seems that there is something wrong in the fields. Please check carefully and try again. 😊' btntext='Understood' />
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign up</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input onChange={handleNameChange} value={name} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={handleEmailChange} value={email} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={handlePasswordChange} value={password} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                            <p className="f7">Must be between 8 to 20 characters, contain at least one for the followings: uppercase, lowercase, number and special character.</p>
                        </div>
                    </fieldset>
                    <div className="" onClick={handleSignUp}>
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign up" />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={handleSignIn} className="f6 link dim black db pointer">Sign in</p>
                    </div>
                </div>
            </main>
        </article>
    );

}

export default Register;