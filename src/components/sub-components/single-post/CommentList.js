import React from 'react';
import { useDispatch } from "react-redux";

import { deleteComment } from "../../../actions/postAction";

import './CommentList.css';

const CommentList = ({ comments, userId, postId }) => {
    const dispatch = useDispatch();

    const deleteHandler = (comment_id) => {
        dispatch(deleteComment(postId, comment_id))
    }

    return(
        <>
            <div className={'comment-list'}>
                {comments.map((comment, index) => {
                    return (
                        <div key={index} className={'comment-item'}>
                            <div className={'comment-image-container'}>
                                <img alt={'profile-pic'} src={comment.avatar} className={'comment-image'}/>
                            </div>
                            <div className={'comment-detail-container'}>
                                <p className={'comment-name'}>{comment.name}</p>
                                <p className={'comment-text'}>{comment.text}</p>
                            </div>
                            {userId === comment.user && <div>
                                <button onClick={() => deleteHandler(comment._id)} type="button" className="btn btn-danger">
                                    <i className="fas fa-times"/>
                                </button>
                            </div>}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default CommentList;