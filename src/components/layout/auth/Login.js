import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { message } from "antd";

import { loginUser } from "../../../actions/authAction";

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [formError, setFormError] = useState({
        isEmailValid: true,
        isPasswordValid: true
    })

    const { password, email } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        setFormError({
            isEmailValid: true,
            isPasswordValid: true
        });
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValidity = emailPattern.test(formData.email);
        const passwordValidity = password.trim().length >= 5;

        if(emailValidity && passwordValidity){
            try{
                dispatch(loginUser(email, password));

                message.success('Login successful');
                history.push('/dashboard');
            }catch (error){
                console.log(error);
                message.error(error.response.data.errors[0].msg);
            }
        }else {
            setFormError({
                isEmailValid: emailValidity,
                isPasswordValid: passwordValidity
            });
        }
    }

    return(
        <>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign In Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="email" value={email} onChange={e => onChange(e)}
                           placeholder="Email Address" name="email"/>
                    {!formError.isEmailValid && <p className={'error-message'}>Enter Valid Email</p>}
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
                    {!formError.isPasswordValid && <p className={'error-message'}>Password must be minimum 5 chars</p>}
                </div>
                <input type="submit" className="btn btn-primary" value="Login"/>
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </>
    )
}

export default Login;