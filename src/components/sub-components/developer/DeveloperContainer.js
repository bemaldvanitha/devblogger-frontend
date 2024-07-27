import React from 'react';
import { Button } from "antd";
import { TiTick } from "react-icons/ti";
import { useHistory } from 'react-router-dom';

import './DeveloperContainer.css';

const DeveloperContainer = ({ location, image, company, name, skills, id }) => {
    const history = useHistory();

    const handlerNavigate = () => {
        history.push(`/developer/${id}`);
    }

    return(
        <div className={'developer-container'}>
            <div className={'developer-avatar-container'}>
                <img alt={'profile-pic'} src={image} className={'developer-avatar'}/>
            </div>
            <div className={'developer-info-container'}>
                <p className={'developer-info-title'}>{name}</p>
                <p className={'developer-info'}>{company}</p>
                <p className={'developer-info'}>{location}</p>
                <Button type="primary" onClick={handlerNavigate} color={'#17a2b8'}>View Profile</Button>
            </div>
            <div className={'developer-hidden-container'}></div>
            <div className={'developer-skills-container'}>
                {skills.map((skill, index) => {
                    return(
                        <div key={index} className={'developer-skill-box'}>
                            <TiTick className={'developer-skill-icon'}/>
                            <p className={'developer-skill-text'}>{skill}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DeveloperContainer;