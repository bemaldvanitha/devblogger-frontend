import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DNA } from "react-loader-spinner";

import { fetchSingleDeveloper } from "../../../actions/developerAction";
import SingleDeveloperMainContainer from "../../sub-components/single-developer/SingleDeveloperMainContainer";
import SingleDevInfoBox from "../../sub-components/single-developer/SingleDevInfoBox";
import SingleDeveloperExperince from "../../sub-components/single-developer/SingleDeveloperExperince";
import SingleDeveloperEducation from "../../sub-components/single-developer/SingleDeveloperEducation";
import SingleUserGithub from "../../sub-components/single-developer/SingleUserGithub";

import './SingleDeveloper.css';

const SingleDeveloper = () => {
    const id = useParams().id;
    const dispatch = useDispatch();
    const developer = useSelector(state => state.developer.selectedDeveloper);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchSingleDeveloper(id));
        setIsLoading(false)
    },[id, dispatch])

    if (isLoading || !developer || Object.keys(developer).length === 0) {
        return (
            <div className={'loading-container'}>
                <DNA visible={true} height="80" width="80" ariaLabel="dna-loading" wrapperStyle={{}}
                     wrapperClass="dna-wrapper"/>
            </div>
        );
    }

    return (
        <div>
            {!isLoading && <div>
                <SingleDeveloperMainContainer image={developer.user.avatar} name={developer.user.name}
                                              company={developer.company}
                                              location={developer.location} web={developer.website} youtube={developer.social.youtube}
                                              twitter={developer.social.twitter} instagram={developer.social.instagram}
                                              linkedin={developer.social.linkedin} facebook={developer.social.facebook}/>
                <SingleDevInfoBox bio={developer.bio} skills={developer.skills}/>
                <div className={'single-dev-divide-container'}>
                    <SingleDeveloperExperince experiences={developer.experience}/>
                    <SingleDeveloperEducation educations={developer.education}/>
                </div>
                {developer.github && <SingleUserGithub github={developer.github}/>}
            </div>}
        </div>
    )
}

export default SingleDeveloper;