import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { FloatButton } from 'antd';
import { FormOutlined } from '@ant-design/icons';

import { fetchAllPosts } from "../../../actions/postAction";
import PostContainer from "../../sub-components/dashboard/PostContainer";

import './Dashboard.css';

const Dashboard = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const posts = useSelector(state => state.post.allPosts);

    useEffect(() => {
        dispatch(fetchAllPosts());
    },[dispatch]);

    const navigateToAddPost = () => {
        history.push('/add-post');
    }

    return(
        <div className={'dashboard-screen'}>
            <div className={'dashboard-header-container'}>
                <p className="lead">
                    <i className="fas fa-user"/> Welcome to the community
                </p>
                <Link to='/add-post' className='btn btn-light'>
                    <i className='fa fa-print text-primary'/> Add Post
                </Link>
            </div>
            <div className={'dashboard-screen-posts-container'}>
                {posts.map((post, index) => {
                    return (
                        <PostContainer key={index} id={post._id} title={post.title} cover={post.cover}
                                       description={post.description}
                                       name={post.name} avatar={post.avatar}/>
                    )
                })}
            </div>
            <FloatButton onClick={navigateToAddPost} type="primary" icon={<FormOutlined />}/>
        </div>
    )
}

export default Dashboard;