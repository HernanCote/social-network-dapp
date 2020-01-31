import React, { useState } from 'react';
import { createIdenticonSrc, toEther } from '../utils';



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
                        <form className="mb-5 mt-4" onSubmit={handleSubmit}>
                            <div className="form-group mr-sm-2">
                                <input
                                    id="postContent"
                                    type="text"
                                    className="form-control"
                                    placeholder="What's on your mind?"
                                    required
                                    onChange={handleInputChange} />
                                <button type="submit" className="btn btn-primary btn-block">Share</button>
                            </div>
                        </form>
                        {posts.map((post, idx) => (
                            <div className="card mb-4" key={idx}>
                                <div className="card-header">
                                    <img
                                        alt="user"
                                        className="mr-2"
                                        width="30"
                                        height="30"
                                        src={createIdenticonSrc(post.author)}
                                    />
                                    <small className="text-muted">{post.author}</small>
                                </div>
                                <ul id="postList" className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <p>{post.content}</p>
                                    </li>
                                    <li className="list-group-item py-2">
                                        <small className="float-left mt-1 text-muted">TIPS: {toEther(post.tipAmount)} ETH</small>
                                        <button
                                            className="btn btn-link btn-sm float-right pt-0"
                                            onClick={handleTipPost}
                                            name={post.id}
                                        >
                                            TIP 0.1 ETH
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Main;