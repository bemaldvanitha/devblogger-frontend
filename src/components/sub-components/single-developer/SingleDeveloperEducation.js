import React from "react";

import './SingleDeveloperEducation.css';

const SingleDeveloperEducation = ({ educations }) => {

    const extractDate = (text) => {
        const textParts = text.split('T');
        return textParts[0];
    }

    return(
        <div className={'single-dev-education-container'}>
            <p className={'single-dev-education-title'}>Education</p>
            {educations.map((education, index) => {
                return(
                    <div key={index} className={'single-dev-education-item'}>
                        <p className={'single-dev-education-text single-dev-education-item-school'}>{education.school}</p>
                        <p className={'single-dev-education-text single-dev-education-item-duration'}>{extractDate(education.from)} -
                            {education.current ? ' Now' : extractDate(education.to)}</p>
                        <div className={'single-dev-education-sub-item'}>
                            <p className={'single-dev-education-text single-dev-education-sub-item-title'}>Degree :</p>
                            <p className={'single-dev-education-text single-dev-education-sub-item-text'}>{education.degree}</p>
                        </div>
                        <div className={'single-dev-education-sub-item'}>
                            <p className={'single-dev-education-text single-dev-education-sub-item-title'}>Field Of
                                Study :</p>
                            <p className={'single-dev-education-text single-dev-education-sub-item-text'}>
                                {education.fieldofstudy}</p>
                        </div>
                        <div className={'single-dev-education-sub-item'}>
                            <p className={'single-dev-education-text single-dev-education-sub-item-title'}>Description :</p>
                            <p className={'single-dev-education-text single-dev-education-sub-item-text'}>
                                {education.description}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SingleDeveloperEducation;