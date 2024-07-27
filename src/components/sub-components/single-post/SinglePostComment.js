import React, { useState } from 'react';
import { useDispatch } from "react-redux";

import { addComment } from "../../../actions/postAction";

import './SinglePostComment.css';

const SinglePostComment = ({ id }) => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addComment(id, text));
        setText('');
    }

    return (
        <div className='post-form'>
            <div className='bg-primary p'>
                <h3>Leave a Comment</h3>
            </div>
            <form className='form my-1' onSubmit={submitHandler}>
                <textarea name='text' cols='30' rows='5' placeholder='Comment the post' value={text}
                    onChange={e => setText(e.target.value)} required/>
                <input type='submit' className='btn btn-dark my-1' value='Submit'/>
            </form>
        </div>
    )
}

export default SinglePostComment;