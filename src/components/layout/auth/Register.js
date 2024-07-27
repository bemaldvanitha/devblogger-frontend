import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { message } from "antd";

import { registerUser } from "../../../actions/authAction";

const Register = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const [formError, setFormError] = useState({
        isEmailValid: true,
        isPasswordValid: true,
        isNameValid: true
    });

    const { name, password, email, password2 } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        setFormError({
            isEmailValid: true,
            isPasswordValid: true,
            isNameValid: true
        });

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValidity = emailPattern.test(formData.email);
        const passwordValidity = password.trim().length >= 5 && password === password2;
        const nameValidity = name.trim().length >= 3;

        if(emailValidity && passwordValidity && nameValidity){
            try{
                dispatch(registerUser(name, email, password));
                message.success('Registration successful');
                history.push('/dashboard');
            }catch (error){
                console.log(error);
                message.error(error.response.data.errors[0].msg);
            }
        }else{
            setFormError({
                isEmailValid: emailValidity,
                isPasswordValid: passwordValidity,
                isNameValid: nameValidity
            });
        }
    }

    return(
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Name" value={name}
                           onChange={(e) => onChange(e)}
                           name="name" required/>
                    {!formError.isNameValid && <p className={'error-message'}>Name must be minimum 3 chars</p>}
                </div>
                <div className="form-group">
                    <input type="email" value={email} onChange={e => onChange(e)}
                           placeholder="Email Address" name="email"/>
                    {!formError.isEmailValid && <p className={'error-message'}>Enter Valid Email</p>}
                    <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                        Gravatar email</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={e => onChange(e)}
                    />
                    {!formError.isPasswordValid && <p className={'error-message'}>Password must be minimum 5 chars and
                        passwords should match</p>}
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                        onChange={e => onChange(e)}
                        value={password2}
                    />
                    {!formError.isPasswordValid && <p className={'error-message'}>Password must be minimum 5 chars and
                        passwords should match</p>}
                </div>
                <input type="submit" className="btn btn-primary" value="Register"/>
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </>
    )
}

export default Register;