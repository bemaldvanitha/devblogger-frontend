import axios from "axios";

import { FETCH_ALL_USERS, FETCH_SINGLE_USER, FETCH_PROFILE_USER, ADD_EXPERINCE, ADD_EDUCATION, UPDATE_PROFILE,
    DELETE_EXPERINCE, DELETE_EDUCATION, FETCH_USER } from "./types";
import { DEV_URL } from "../configuration/config";

export const fetchAllDevelopers = () => {
    return async (dispatch, getState) => {
        try {
            const users = await axios.get(`${DEV_URL}/api/profile`);
            const data = users.data;
            console.log(data, 'data');
            dispatch({
                type: FETCH_ALL_USERS,
                payload: data
            })
        }catch (error){
            console.log(error);
        }
    }
}

export const fetchSingleDeveloper = (userId) => {
    return async (dispatch, getState) => {
        try{
            const user = await axios.get(`${DEV_URL}/api/profile/user/${userId}`);
            const data = user.data;

            try{
                const github = await axios.get(`${DEV_URL}/api/profile/github/${data.githubusername}`);
                data.github = github.data;

            }catch (err){
                if(err.response.status !== 200) {
                    console.log('github error', err);
                }
            }

            dispatch({
                type: FETCH_SINGLE_USER,
                payload: data
            });

        }catch (error){
            console.log(error);
        }
    }
}

export const fetchProfile = () => {
    return async (dispatch, getState) => {
        try{
            const token = localStorage.getItem('token');

            const { data } = await axios.get(`${DEV_URL}/api/profile/me`, {
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json',
                },
            });

            dispatch({
                type: FETCH_PROFILE_USER,
                payload: data
            });
        }catch (error){
            console.log(error);
        }
    }
}

export const updateExperince = (title, company, location, from, to, current, description) => {
    return async (dispatch, getState) => {
        try{
            const token = localStorage.getItem('token');

            const { data } = await axios.put(`http://localhost:5000/api/profile/experience`,{
                title: title,
                company: company,
                location: location,
                from: from,
                to: to,
                current: current,
                description: description
            },{
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json',
                },
            });

            dispatch({
                type: ADD_EXPERINCE,
                payload: data
            });
        }catch (error){
            console.log(error);
        }
    }
}

export const updateEducation = (school, degree, fieldofstudy, from, to, current, description) => {
    return async (dispatch, getState) => {
        try{
            const token = localStorage.getItem('token');

            const { data } = await axios.put(`${DEV_URL}/api/profile/education`,{
                school: school,
                degree: degree,
                fieldofstudy: fieldofstudy,
                from: from,
                to: to,
                current: current,
                description: description
            },{
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json',
                },
            });

            dispatch({
                type: ADD_EDUCATION,
                payload: data
            });
        }catch (error){
            console.log(error);
        }
    }
}

export const updateProfile = (company, location, website, bio, skills, status, githubusername, youtube, twitter,
                              instagram, linkedin, facebook) => {
    return async (dispatch, getState) => {
        try {
            const token = localStorage.getItem('token');

            const { data } = await axios.post(`${DEV_URL}/api/profile`,{
                company: company,
                location: location,
                website: website,
                bio: bio,
                skills: skills,
                status: status,
                githubusername: githubusername,
                youtube: youtube,
                twitter: twitter,
                instagram: instagram,
                linkedin: linkedin,
                facebook: facebook
            },{
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json',
                },
            });

            dispatch({
                type: UPDATE_PROFILE,
                payload: data
            });

        }catch (error){
            console.log(error);
        }
    }
}

export const deleteExperince = (experince_id) => {
    return async (dispatch, getState) => {
        try{
            const token = localStorage.getItem('token');

            const { data } = await axios.delete(`${DEV_URL}/api/profile/experience/${experince_id}`,{
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json',
                },
            });

            dispatch({
                type: DELETE_EXPERINCE,
                payload: data
            });

        }catch (error){
            console.log(error);
        }
    }
}

export const deleteEducation = (education_id) => {
    return async (dispatch, getState) => {
        try{
            const token = localStorage.getItem('token');

            const { data } = await axios.delete(`${DEV_URL}/api/profile/education/${education_id}`,{
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json',
                },
            });

            dispatch({
                type: DELETE_EDUCATION,
                payload: data
            });

        }catch (error){
            console.log(error);
        }
    }
}

export const fetchUser = () => {
    return async (dispatch, getState) => {
        try{
            const token = localStorage.getItem('token');

            const { data } = await axios.get(`${DEV_URL}/api/auth`,{
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json',
                },
            });

            dispatch({
                type: FETCH_USER,
                payload: data
            });

        }catch (error){
            console.log(error);
        }
    }
}