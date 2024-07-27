import axios from "axios";

import { ADD_POST, FETCH_ALL_POSTS, FETCH_SINGLE_POST, ADD_COMMENT, DELETE_COMMENT, ADD_LIKE, ADD_DISLIKE } from "./types";
import { DEV_URL } from "../configuration/config";

export const addPost = (title, shortDescription, content, coverPhoto) => {
    return async (dispatch, getState) => {
        try{
            const token = localStorage.getItem('token');

            const { data } = await axios.post(`${DEV_URL}/api/posts`,{
                text: content,
                title: title,
                cover: coverPhoto,
                description: shortDescription
            },{
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json',
                },
            });

            dispatch({
                action: ADD_POST
            })

        }catch (error){
            console.log(error);
        }
    }
}

export const fetchAllPosts = () => {
    return async (dispatch, getState) => {
        try{
            const token = localStorage.getItem('token');

            const { data } = await axios.get(`${DEV_URL}/api/posts`,{
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json',
                }
            });

            dispatch({
                type: FETCH_ALL_POSTS,
                payload: data
            });
        }catch (error){
            console.log(error);
        }
    }
}

export const fetchSinglePosts = (post_id) => {
    return async (dispatch, getState) => {
        try{
            const token = localStorage.getItem('token');

            const { data } = await axios.get(`${DEV_URL}/api/posts/${post_id}`,{
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json',
                }
            });

            dispatch({
                type: FETCH_SINGLE_POST,
                payload: data
            });
        }catch (error){
            console.log(error);
        }
    }
}

export const addComment = (post_id, text) => {
    return async (dispatch, getState) => {
        try{
            const token = localStorage.getItem('token');

            const { data } = await axios.post(`${DEV_URL}/api/posts/comment/${post_id}`,{
                text: text
            },{
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json',
                }
            });

            dispatch({
                type: ADD_COMMENT,
                payload: data
            });
        }catch (error){
            console.log(error);
        }
    }
}

export const deleteComment = (post_id, comment_id) => {
    return async (dispatch, getState) => {
        try{
            const token = localStorage.getItem('token');

            const { data } = await axios.delete(`${DEV_URL}/api/posts/comment/${post_id}/${comment_id}`,{
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json',
                }
            });

            dispatch({
                type: DELETE_COMMENT,
                payload: data
            });
        }catch (error){
            console.log(error);
        }
    }
}

export const addLike = (post_id) => {
    return async (dispatch, getState) => {
        try{
            const token = localStorage.getItem('token');

            const { data } = await axios.put(`${DEV_URL}/api/posts/like/${post_id}`,{},{
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json',
                }
            });

            dispatch({
                type: ADD_LIKE,
                payload: data
            });
        }catch (error){
            console.log(error);
        }
    }
}

export const addDislike = (post_id) => {
    return async (dispatch, getState) => {
        try{
            const token = localStorage.getItem('token');
            console.log(token)

            const { data } = await axios.put(`${DEV_URL}/api/posts/unlike/${post_id}`,{},{
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json',
                }
            });

            dispatch({
                type: ADD_DISLIKE,
                payload: data
            });
        }catch (error){
            console.log(error);
        }
    }
}