import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { MdInfoOutline, MdDeleteForever } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import { DNA } from "react-loader-spinner";
import { useHistory } from "react-router-dom";

import IconButton from "../../sub-components/common/IconButton";
import ExperinceTable from "../../sub-components/profile/ExperinceTable";
import { fetchProfile } from "../../../actions/developerAction";
import EducationTable from "../../sub-components/profile/EducationTable";

import './Profile.css';

const Profile = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const profile = useSelector(state => state.developer.userDeveloper);
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchProfile());
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    },[]);

    if(!isLoading &&  Object.keys(profile).length === 0){
        history.push('/add-profile');
    }

    if (isLoading || !profile || Object.keys(profile).length === 0) {
        return (
            <div className={'loading-container'}>
                <DNA visible={true} height="80" width="80" ariaLabel="dna-loading" wrapperStyle={{}}
                     wrapperClass="dna-wrapper"/>
            </div>
        );
    }

    const editProfileNavigateHandler = () => {
        history.push('/add-profile');
    }

    const addExperinceNavigateHandler = () => {
        history.push('/add-experince');
    }

    const addEducationNavigateHandler = () => {
        history.push('/add-education');
    }

    const deleteProfileHandler = () => {

    }

    if(!isLoading){
        return(
            <div>
                <div className={'profile-sub-container'}>
                    <p className={'profile-main-title'}>Profile</p>
                    <p className={'profile-welcome-title'}>Welcome {profile.user.name}</p>
                </div>
                <div className={'profile-icon-container'}>
                    <IconButton icon={<CgProfile/>} text={'Edit Profile'} onClick={editProfileNavigateHandler}/>
                    <IconButton icon={<MdInfoOutline/>} text={'Add Experince'} onClick={addExperinceNavigateHandler}/>
                    <IconButton icon={<FaUniversity/>} text={'Add Education'} onClick={addEducationNavigateHandler}/>
                </div>
                <div className={'profile-sub-container'}>
                    <p className={'profile-sub-title'}>Experince</p>
                    <ExperinceTable experience={profile.experience}/>
                </div>
                <div className={'profile-sub-container'}>
                    <p className={'profile-sub-title'}>Education</p>
                    <EducationTable education={profile.education}/>
                </div>
                <div>
                    <IconButton icon={<MdDeleteForever/>} text={'Delete Profile'} onClick={deleteProfileHandler}
                                color={'white'} backgroundColor={'#dc3545'}/>
                </div>
            </div>
        )
    }
}

export default Profile;