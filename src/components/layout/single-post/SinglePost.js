import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from 'react-quill';
import { DNA } from 'react-loader-spinner'

import { fetchSinglePosts } from "../../../actions/postAction";
import { fetchUser } from "../../../actions/developerAction";
import SinglePostComment from "../../sub-components/single-post/SinglePostComment";
import CommentList from "../../sub-components/single-post/CommentList";
import LikeDislikeContainer from "../../sub-components/single-post/LikeDislikeContainer";

import './SinglePost.css';

const SinglePost = () => {
    const id = useParams().id;
    const dispatch = useDispatch();
    const post = useSelector(state => state.post.selectedPost);
    const user = useSelector(state => state.developer.user);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        dispatch(fetchUser());
        dispatch(fetchSinglePosts(id));
        setIsLoading(false);
    },[id, dispatch]);

    if (isLoading || !post || Object.keys(post).length === 0 || !user || Object.keys(user).length === 0) {
        return (
            <div className={'loading-container'}>
                <DNA visible={true} height="80" width="80" ariaLabel="dna-loading" wrapperStyle={{}} wrapperClass="dna-wrapper"/>
            </div>
        );
    }

    return(
        <div className={'single-post'}>
            <div className={'single-post-title-container'}>
                <p className={'single-post-title'}>{post.title}</p>
            </div>
            <div className={'single-post-image-container'}>
                <img alt={'main-image'} src={post.cover} className={'single-post-image'}/>
            </div>
            <ReactQuill value={post.text} readOnly={true} theme="snow" modules={{toolbar: false}}/>
            <div className={'single-post-avatar-container'}>
                <div></div>
                <img alt={'avatar'} src={post.avatar} className={'post-owner-avatar'}/>
                <p className={'post-owner-name'}>{post.name}</p>
            </div>
            <LikeDislikeContainer likes={post.likes} id={post._id} userId={user._id}/>
            <SinglePostComment id={post._id}/>
            <CommentList comments={post.comments} userId={user._id} postId={post._id}/>
        </div>
    )
}

export default SinglePost;