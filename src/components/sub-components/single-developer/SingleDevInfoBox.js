import React from 'react';

import './SingleDevInfoBox.css';

const SingleDevInfoBox = ({ bio, skills }) => {
    const tickMark = '\u2713';

    return(
        <div>
            <div className={'single-dev-info-box'}>
                <p className={'single-dev-info-box-title'}>Bio</p>
                <p className={'single-dev-info-box-text'}>{bio}</p>
            </div>
            <div className={'single-dev-info-box'}>
                <p className={'single-dev-info-box-title'}>Skill Set</p>
                <div className={'single-dev-info-box-skills'}>
                    {skills.map((skill, index) => {
                        return(
                            <p key={index} className={'single-dev-info-box-text-item'}>{tickMark} {skill}</p>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SingleDevInfoBox;