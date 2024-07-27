import React from 'react';

import './SingleUserGithub.css';

const SingleUserGithub = ({ github }) => {

    const extractDate = (text) => {
        const textParts = text.split('T');
        return textParts[0];
    }

    return(
        <div className={'single-user-github'}>
            <p className={'single-user-github-title'}>Github Repos</p>
            {github.map((githubProject, index) => {
                return(
                    <div key={index} className={'single-user-github-box'}>
                        <div className={'single-user-github-left-box'}>
                            <p className={'single-user-github-box-text single-user-github-box-title'}>{githubProject.name}</p>
                            <p className={'single-user-github-box-text'}>{githubProject.description}</p>
                            <p className={'single-user-github-box-text'}>{extractDate(githubProject.created_at)}</p>
                        </div>
                        <div></div>
                        <div className={'single-user-github-right-box'}>
                            <div className={'single-user-github-tag'}>
                                <p className={'single-user-github-tag-text'}>Stars : {githubProject.stargazers_count}</p>
                            </div>
                            <div  className={'single-user-github-tag'}>
                                <p className={'single-user-github-tag-text'}>Watchers : {githubProject.watchers_count}</p>
                            </div>
                            <div  className={'single-user-github-tag'}>
                                <p className={'single-user-github-tag-text'}>Forks: {githubProject.forks_count}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SingleUserGithub;