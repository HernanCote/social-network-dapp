import React from 'react';

import Post from './Post';

const PostList = ({
    posts,
    handleTipPost,
}) => (
        <>
            {posts.map((post, idx) => <Post key={idx} handleTipPost={handleTipPost} {...post} />)}
        </>
    );

export default PostList;