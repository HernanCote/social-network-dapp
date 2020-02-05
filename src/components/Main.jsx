import React, { useState } from 'react';

import PostList from './PostList';
import Form from './Form';



const Main = ({
    className,
    posts,
    createPost,
    tipPost
}) => {

    const [postContent, setPostContent] = useState('');

    const handleInputChange = (e) => {
        setPostContent(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost(postContent);
    };

    const handleTipPost = (e) => {
        const postId = e.target.name;
        const tipAmount = window.web3.utils.toWei('0.1', 'Ether');
        tipPost(postId, tipAmount);
    }

    return (
        <div className={`${className} container-fluid mt-5`}>
            <div className="row">
                <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '32rem' }}>
                    <div className="content mr-auto ml-auto">
                        <Form
                            handleSubmit={handleSubmit}
                            handleInputChange={handleInputChange}
                        />
                        <PostList
                            posts={posts}
                            handleTipPost={handleTipPost}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Main;