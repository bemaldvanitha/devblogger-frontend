import React from "react";

import './SingleDeveloperExperince.css';

const SingleDeveloperExperince = ({ experiences }) => {

    const extractDate = (text) => {
        const textParts = text.split('T');
        return textParts[0];
    }

    return(
        <div className={'single-dev-experince-container'}>
            <p className={'single-dev-experince-title'}>Experince</p>
            {experiences.map((experience, index) => {
                return(
                    <div key={index} className={'single-dev-experince-item'}>
                        <p className={'single-dev-experince-text single-dev-experince-item-company'}>{experience.company}</p>
                        <p className={'single-dev-experince-text single-dev-experince-item-duration'}>{extractDate(experience.from)} -
                            {experience.current ? ' Now' : extractDate(experience.to)}</p>
                        <div className={'single-dev-experince-sub-item'}>
                            <p className={'single-dev-experince-text single-dev-experince-sub-item-title'}>Position :</p>
                            <p className={'single-dev-experince-text single-dev-experince-sub-item-text'}>{experience.title}</p>
                        </div>
                        <div className={'single-dev-experince-sub-item'}>
                            <p className={'single-dev-experince-text single-dev-experince-sub-item-title'}>Description :</p>
                            <p className={'single-dev-experince-text single-dev-experince-sub-item-text'}>
                                {experience.description}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SingleDeveloperExperince;