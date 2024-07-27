import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { useHistory } from "react-router-dom";

import { updateEducation } from "../../../actions/developerAction";

import './AddEducation.css';

const AddEducation = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: true,
        description: ''
    });

    const [formError, setFormError] = useState({
        isSchoolValid: true,
        isDegreeValid: true,
        isFieldofstudyValid: true,
        isToValid: true,
        isDescriptionValid: true,
    });

    const { current, degree, description, fieldofstudy, from, to, school } = formData;

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
            isSchoolValid: true,
            isDegreeValid: true,
            isToValid: true,
            isFieldofstudyValid: true,
            isDescriptionValid: true
        });

        const fromDate = new Date(from);
        const toDate = new Date(to);

        const schoolValidity = school.trim().length >= 3;
        const degreeValidity = degree.trim().length >= 3;
        const fieldOfStudyValidity = fieldofstudy.trim().length >= 3;
        const descriptionValidity = description.trim().length >= 10;
        let toValidity = true;

        if (!isNaN(toDate.getTime())) {
            if(!current && fromDate > toDate){
                toValidity = false;
            }
        }

        if(schoolValidity && degreeValidity && fieldOfStudyValidity && descriptionValidity && toValidity){
            dispatch(updateEducation(school, degree, fieldofstudy, from, to, current, description));
            message.success('Education Qualification updated');
            history.push('/profile');
        }else {
            setFormError({
                isSchoolValid: schoolValidity,
                isDegreeValid: degreeValidity,
                isToValid: toValidity,
                isFieldofstudyValid: fieldOfStudyValidity,
                isDescriptionValid: descriptionValidity
            });
        }
    }

    return(
        <div>
            <h1 className="large text-primary">Add Education Qualification</h1>
            <p className="lead"><i className="fas fa-university"></i> Add any education qualifications related to it
                industry</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="School" value={school}
                           onChange={(e) => onChange(e)}
                           name="school" required/>
                    {!formError.isSchoolValid &&
                        <p className={'error-message'}>School name must be minimum 3 chars</p>}
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Degree" value={degree}
                           onChange={(e) => onChange(e)}
                           name="degree" required/>
                    {!formError.isDegreeValid &&
                        <p className={'error-message'}>Degree name must be minimum 3 chars</p>}
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field of Study" value={fieldofstudy}
                           onChange={(e) => onChange(e)}
                           name="fieldofstudy" required/>
                    {!formError.isFieldofstudyValid &&
                        <p className={'error-message'}>Field of study must be minimum 3 chars</p>}
                </div>
                <div className="form-group">
                    <p className={'form-text'}>Starting Date</p>
                    <input type="date" placeholder="From Date" value={from}
                           onChange={(e) => onChange(e)}
                           name="from" required/>
                </div>

                <div className="form-group">
                    <p className={'form-text'}>Currently Studying hear</p>
                    <input type="checkbox" placeholder="Currently Studying" checked={current}
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
                    <textarea placeholder="Qualification Description" value={description}
                              onChange={(e) => onChange(e)}
                              name="description" required></textarea>
                    {!formError.isDescriptionValid &&
                        <p className={'error-message'}>Description must be minimum 10 chars</p>}
                </div>
                <input type="submit" className="btn btn-primary" value="Add Education Qualifications"/>
            </form>
        </div>
    )
}

export default AddEducation;