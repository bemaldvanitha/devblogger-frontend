import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { message } from "antd";

import { updateProfile } from "../../../actions/developerAction";

import './AddProfile.css';

const AddProfile = () => {
    const profile = useSelector(state => state.developer.userDeveloper);
    const dispatch = useDispatch();
    const history = useHistory();
    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    const [formData, setFormData] = useState({
        company: '',
        location: '',
        website: '',
        bio: '',
        skills: '',
        status: '',
        githubusername: '',
        youtube: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        facebook: ''
    });

    const [formError, setFormError] = useState({
       isCompanyValid: true,
       isLocationValid: true,
       isWebsiteValid: true,
       isBioValid: true,
       isSkillsValid: true,
       isStatusValid: true,
       isGithubUserNameValid: true,
       isYoutubeValid: true,
       isFacebookValid: true,
       isTwitterValid: true,
       isLinkedInValid: true,
       isInstagramValid: true
    });

    useEffect(() => {
        if(profile &&  Object.keys(profile).length !== 0){
            setFormData({
                bio: profile.bio,
                website: profile.website,
                facebook: profile.social.facebook,
                instagram: profile.social.instagram,
                twitter: profile.social.twitter,
                youtube: profile.social.youtube,
                linkedin: profile.social.linkedin,
                status: profile.status,
                skills: profile.skills.join(','),
                githubusername: profile.githubusername,
                location: profile.location,
                company: profile.company
            });
        }
    },[profile]);

    const { bio, company, facebook, githubusername, instagram, linkedin,
        location, skills, status, twitter, website, youtube} = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function isGitHubUsernameValid(username) {
        const apiUrl = `https://api.github.com/users/${username}`;

        try {
            const response = await fetch(apiUrl);
            if (response.ok) {
                const userData = await response.json();
                if (userData.login.toLowerCase() === username.toLowerCase()) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        setFormError({
            isYoutubeValid: true,
            isInstagramValid: true,
            isBioValid: true,
            isLinkedInValid: true,
            isTwitterValid: true,
            isFacebookValid: true,
            isSkillsValid: true,
            isGithubUserNameValid: true,
            isStatusValid: true,
            isWebsiteValid: true,
            isLocationValid: true,
            isCompanyValid: true
        });

        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
        const youtubeRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/.+$/;
        const facebookRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/.+$/;
        const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/.+$/;
        const linkedInRegex= /^(https?:\/\/)?(www\.)?linkedin\.com\/.+$/;
        const twitterRegex = /^(https?:\/\/)?(www\.)?twitter\.com\/.+$/;

        const companyValidity = company.trim().length >= 3;
        const locationValidity = location.trim().length >= 3;
        const statusValidity = status.trim() !== '';
        const websiteValidity =  urlRegex.test(website) || website.trim().length === 0;
        const bioValidity = bio.trim().length >= 10;
        const githubUserNameValidity = await isGitHubUsernameValid(githubusername);
        const youtubeValidity = youtubeRegex.test(youtube) || youtube.trim().length === 0;
        const facebookValidity = facebookRegex.test(facebook) || facebook.trim().length === 0;
        const twitterValidity = twitterRegex.test(twitter) || twitter.trim().length === 0;
        const linkedInValidity = linkedInRegex.test(linkedin) || linkedin.trim().length === 0;
        const instagramValidity = instagramRegex.test(instagram) || instagram.trim().length === 0;
        const skillValidity = skills.split(',').length >= 1;

        if(companyValidity && locationValidity && skillValidity && statusValidity && websiteValidity && bioValidity &&
            githubUserNameValidity && youtubeValidity && facebookValidity && twitterValidity && linkedInValidity &&
            instagramValidity){

            dispatch(updateProfile(company, location, website, bio, skills, status, githubusername, youtube,
                twitter, instagram, linkedin, facebook));
            message.success('Profile Updated');
            history.push('/profile');

        }else {
            setFormError({
                isYoutubeValid: youtubeValidity,
                isInstagramValid: instagramValidity,
                isBioValid: bioValidity,
                isLinkedInValid: linkedInValidity,
                isTwitterValid: twitterValidity,
                isFacebookValid: facebookValidity,
                isSkillsValid: skillValidity,
                isGithubUserNameValid: githubUserNameValidity,
                isStatusValid: statusValidity,
                isWebsiteValid: websiteValidity,
                isLocationValid: locationValidity,
                isCompanyValid: companyValidity
            });
        }
    }

    return(
        <div>
            <h1 className="large text-primary">Create Profile</h1>
            <p className="lead"><i className="fas fa-university"></i> Add any education qualifications related to it
                industry</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Company" value={company}
                           onChange={(e) => onChange(e)}
                           name="company" required/>
                    <small className="form-text">
                        Could be your own company or one you work for
                    </small>
                    {!formError.isCompanyValid &&
                        <p className={'error-message'}>Company name must be minimum 3 chars</p>}
                </div>
                <div className="form-group">
                    <select name="status" value={status} onChange={onChange} required>
                        <option>* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">
                        Give us an idea of where you are at in your career
                    </small>
                    {!formError.isStatusValid &&
                        <p className={'error-message'}>Chose Your Status</p>}
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" value={website} onChange={onChange}/>
                    <small className="form-text">
                        Could be your own or a company website
                    </small>
                    {!formError.isWebsiteValid &&
                        <p className={'error-message'}>Enter Valid website</p>}
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} required/>
                    <small className="form-text">
                        City & country suggested (eg. Colombo, Sri Lanka)
                    </small>
                    {!formError.isLocationValid &&
                        <p className={'error-message'}>Enter Valid location</p>}
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={onChange} required/>
                    <small className="form-text">
                        Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
                    </small>
                    {!formError.isSkillsValid &&
                        <p className={'error-message'}>Skills should separate from comma</p>}
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Github Username" name="githubusername" value={githubusername}
                           onChange={onChange} required/>
                    <small className="form-text">
                        If you want your latest repos and a Github link, include your
                        username
                    </small>
                    {!formError.isGithubUserNameValid &&
                        <p className={'error-message'}>Github username should be valid</p>}
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="bio" value={bio}
                              onChange={onChange} required></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                    {!formError.isBioValid &&
                        <p className={'error-message'}>Bio should be minimum 10 chars</p>}
                </div>
                <div className="my-2">
                    <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button"
                            className="btn btn-light">
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>
                {displaySocialInputs && (
                    <>
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"/>
                            <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={onChange}/>
                            {!formError.isTwitterValid &&
                                <p className={'error-message'}>Enter valid twitter link</p>}
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"/>
                            <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={onChange}/>
                            {!formError.isFacebookValid &&
                                <p className={'error-message'}>Enter valid facebook link</p>}
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"/>
                            <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={onChange}/>
                            {!formError.isYoutubeValid &&
                                <p className={'error-message'}>Enter valid youtube link</p>}
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x"/>
                            <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={onChange}/>
                            {!formError.isLinkedInValid &&
                                <p className={'error-message'}>Enter valid linked in link</p>}
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"/>
                            <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={onChange}/>
                            {!formError.isInstagramValid &&
                                <p className={'error-message'}>Enter valid instagram link</p>}
                        </div>
                    </>
                )}
                <input type="submit" className="btn btn-primary my-1"/>
            </form>
        </div>
    )
}

export default AddProfile;