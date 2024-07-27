import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { message } from "antd";
import { useHistory } from "react-router-dom";

import { updateExperince } from "../../../actions/developerAction";

import './AddExperience.css';

const AddExperience = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: true,
        description: ''
    });

    const [formError, setFormError] = useState({
        isTitleValid: true,
        isCompanyValid: true,
        isLocationValid: true,
        isToValid: true,
        isDescriptionValid: true,
    });

    const { company, current, description, from, location, to,
            title} = formData;

    const onChange = (e, tick = false) => {
        if(tick){
            setFormData({ ...formData, current: e.target.checked });
        }else{
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        setFormError({
            isDescriptionValid: true,
            isToValid: true,
            isLocationValid: true,
            isTitleValid: true,
            isCompanyValid: true
        });

        const fromDate = new Date(from);
        const toDate = new Date(to);

        const titleValidity = title.trim().length >= 3;
        const companyValidity = company.trim().length >= 3;
        const locationValidity = location.trim().length >= 3;
        const descriptionValidity = description.trim().length >= 10;
        let toValidity = true;

        if (!isNaN(toDate.getTime())) {
            if(!current && fromDate > toDate){
                toValidity = false;
            }
        }

        if(titleValidity && companyValidity && locationValidity && descriptionValidity && toValidity){
            dispatch(updateExperince(title, company, location, from, to, current, description));
            message.success('Work Experince updated');
            history.push('/profile');
        }else{
            setFormError({
                isDescriptionValid: descriptionValidity,
                isToValid: toValidity,
                isLocationValid: locationValidity,
                isTitleValid: titleValidity,
                isCompanyValid: companyValidity
            });
        }
    }

    return(
        <div>
            <h1 className="large text-primary">Add an experince</h1>
            <p className="lead"><i className="fas fa-code"></i> Add any development related position that had in past</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Company" value={company}
                           onChange={(e) => onChange(e)}
                           name="company" required/>
                    {!formError.isCompanyValid &&
                        <p className={'error-message'}>Company name must be minimum 3 chars</p>}
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Title" value={title}
                           onChange={(e) => onChange(e)}
                           name="title" required/>
                    {!formError.isTitleValid &&
                        <p className={'error-message'}>Title must be minimum 3 chars</p>}
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" value={location}
                           onChange={(e) => onChange(e)}
                           name="location" required/>
                    {!formError.isLocationValid &&
                        <p className={'error-message'}>Location must be minimum 3 chars</p>}
                </div>

                <div className="form-group">
                    <p className={'form-text'}>Starting Date</p>
                    <input type="date" placeholder="From Date" value={from}
                           onChange={(e) => onChange(e)}
                           name="from" required/>
                </div>

                <div className="form-group">
                    <p className={'form-text'}>Currently working hear</p>
                    <input type="checkbox" placeholder="Currently Working" checked={current}
                           onChange={(e) => onChange(e, true)}
                           name="current"/>
                </div>

                <div className="form-group">
                    <p className={'form-text'}>Ending Date</p>
                    <input type="date" placeholder="To Date" value={to}
                           onChange={(e) => onChange(e)}
                           name="to"/>
                    {!formError.isToValid &&
                        <p className={'error-message'}>Ending date can not be before starting date</p>}
                </div>

                <div className="form-group">
                    <textarea placeholder="Job Description" value={description}
                              onChange={(e) => onChange(e)}
                              name="description" required></textarea>
                    {!formError.isDescriptionValid &&
                        <p className={'error-message'}>Description must be minimum 10 chars</p>}
                </div>
                <input type="submit" className="btn btn-primary" value="Add Experince"/>
            </form>
        </div>
    )
}

export default AddExperience;