import React from 'react';
import { useHistory } from "react-router-dom";

import './PostContainer.css';

const PostContainer = ({ id, name, cover, avatar, title, description }) => {
    const history = useHistory();

    const navigateToSinglePost = () => {
        history.push(`/post/${id}`);
    }

    return(
        <div className={'post-container'} onClick={navigateToSinglePost}>
            <div style={{ backgroundImage: `url(${cover})` }} className={'post-cover-image'}>
                <p className={'post-title'}>{title}</p>
            </div>
            <div className={'post-bottom-container'}>
                <div className={'post-description-container'}>
                    <p className={'post-description'}>{description}</p>
                </div>
                <div className={'post-owner-container'}>
                    <img alt={'avatar'} src={avatar} className={'post-owner-avatar'}/>
                    <p className={'post-owner-name'}>{name}</p>
                </div>
            </div>
        </div>
    )
}

export default PostContainer;