import React from 'react';
import { useDispatch } from "react-redux";
import { message } from "antd";

import { addDislike, addLike } from "../../../actions/postAction";

import './LikeDislikeContainer.css';

const LikeDislikeContainer = ({ likes, id, userId }) => {
    const dispatch = useDispatch();

    const likeHandler = () => {
        const isAlreadyLiked = likes.some(like => like.user === userId);
        if(isAlreadyLiked){
            message.warning('Post already liked!');
        }else{
            dispatch(addLike(id));
        }
    }

    const disLikeHandler = () => {
        const isAlreadyLiked = likes.some(like => like.user === userId);
        if(isAlreadyLiked){
            dispatch(addDislike(id));
        }else{
            message.warning('Post has not liked!');
        }
    }

    return(
        <div className={'like-dislike-container'}>
            <button onClick={likeHandler} type="button" className="btn btn-light">
                <i className="fas fa-thumbs-up"/>{' '}
                <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button onClick={disLikeHandler} type="button" className="btn btn-light">
                <i className="fas fa-thumbs-down"/>
            </button>
        </div>
    )
}

export default LikeDislikeContainer;