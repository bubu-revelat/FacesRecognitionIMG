import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PopUp from '../PopUp/PopUp';


function SignIn() {
    let navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false)
    const [email, onEmailChange] = useState(null)
    const [password, onPasswordChange] = useState(null)


    function isValidPassword(password) {
        if (password !== '' &&
            password !== undefined &&
            password.length > 0)
            return true;


        return false;
    }

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    function isValidEmail(email) {
        // Regular expression pattern for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Check if the email matches the pattern
        return emailRegex.test(email);
    }


    const handleEmailChange = (event) => {
        onEmailChange(event.target.value);
    };


    const handlePasswordChange = (event) => {
        onPasswordChange(event.target.value);
    }


    const handleSignIn = async () => {
        if (isValidEmail(email) && isValidPassword(password)) {

            let payload = {
                email: email,
                password: password
            }
            const signin = await fetch('http://localhost:3000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (signin) {
                const response = await signin.json();
                if (response?.result) {
                    navigate('/home');
                } else {
                    alert(response?.message)
                }
            }

        } else {
            toggleModal();
        }
    };

    const handleRegister = () => {
        navigate('/register');
    }

    return (
        <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <PopUp isOpen={isOpen} onClose={toggleModal} text='🫢 Invalid username or password' btntext="Try again" />
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={handleEmailChange} value={email} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={handlePasswordChange} value={password} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            onClick={handleSignIn}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign in" />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={handleRegister} className="f6 link dim black db pointer">Sign up</p>
                    </div>
                </div>
            </main>
        </article>
    );

}

export default SignIn;