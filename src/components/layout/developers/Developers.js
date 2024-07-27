import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { fetchAllDevelopers } from "../../../actions/developerAction";
import DeveloperContainer from "../../sub-components/developer/DeveloperContainer";

import './Developers.css';

const Developers = () => {
    const dispatch = useDispatch();
    const developers = useSelector(state => state.developer.developers);

    useEffect(() => {
        dispatch(fetchAllDevelopers());
    },[dispatch])

    return(
        <div className={'developer-screen'}>
            <div className={'developer-screen-header'}>
                <p className={'developer-screen-header-title'}>Developers</p>
                <p className={'developer-screen-header-desc'}>Browse and connect with developers</p>
            </div>
            <div className={'developer-screen-list'}>
                {developers.map((developer, index) => {
                    return(
                        <DeveloperContainer key={index} image={developer.user.avatar} name={developer.user.name}
                                            company={developer.company} location={developer.location} skills={developer.skills}
                                            id={developer.user._id}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Developers;