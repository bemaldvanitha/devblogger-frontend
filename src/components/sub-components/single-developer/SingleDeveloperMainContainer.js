import React from 'react';
import { FaGlobeAsia, FaYoutube, FaLinkedinIn, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

import './SingleDeveloperMainContainer.css';

const SingleDeveloperMainContainer = ({ web, youtube, twitter, instagram, name, facebook, image, linkedin, location, company}) => {

    const handleIconClick = (type) =>{
        switch (type){
            case 'web':
                window.open(web, '_blank');
                break;
            case 'youtube':
                window.open(youtube, '_blank');
                break;
            case 'twitter':
                window.open(twitter, '_blank');
                break;
            case 'instagram':
                window.open(instagram, '_blank');
                break;
            case 'facebook':
                window.open(facebook, '_blank');
                break;
            case 'linkedin':
                window.open(linkedin, '_blank');
                break;
            default:
                window.open(web, '_blank');
                break;
        }
    }

    return(
        <div className={'single-developer-main-container'}>
            <div className={'single-developer-avatar-container'}>
                <img alt={'profile-picture'} src={image} className={'single-developer-avatar'}/>
            </div>
            <div className={'single-developer-info-container'}>
                <p className={'single-developer-info single-developer-info-name'}>{name}</p>
                <p className={'single-developer-info single-developer-info-company'}>{company}</p>
                <p className={'single-developer-info single-developer-info-location'}>{location}</p>
            </div>
            <div className={'single-developer-links'}>
                <FaGlobeAsia className={'single-developer-link-icon'} onClick={() => handleIconClick('web')}/>
                <FaYoutube className={'single-developer-link-icon'} onClick={() => handleIconClick('youtube')}/>
                <FaLinkedinIn className={'single-developer-link-icon'} onClick={() => handleIconClick('twitter')}/>
                <FaFacebook className={'single-developer-link-icon'} onClick={() => handleIconClick('instagram')}/>
                <FaInstagram className={'single-developer-link-icon'} onClick={() => handleIconClick('facebook')}/>
                <FaTwitter className={'single-developer-link-icon'} onClick={() => handleIconClick('linkedin')}/>
            </div>
        </div>
    )
}

export default SingleDeveloperMainContainer;