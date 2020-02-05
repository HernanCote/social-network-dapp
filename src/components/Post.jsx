import React from 'react';
import { createIdenticonSrc, toEther } from '../utils';


const Post = ({
    id,
    content,
    author,
    tipAmount,
    handleTipPost,
}) => (
        <div className="card mb-4">
            <div className="card-header">
                <img
                    alt="user"
                    className="mr-2"
                    width="30"
                    height="30"
                    src={createIdenticonSrc(author)}
                />
                <small className="text-muted">{author}</small>
            </div>
            <ul id="postList" className="list-group list-group-flush">
                <li className="list-group-item">
                    <p>{content}</p>
                </li>
                <li className="list-group-item py-2">
                    <small className="float-left mt-1 text-muted">TIPS: {toEther(tipAmount)} ETH</small>
                    <button
                        className="btn btn-link btn-sm float-right pt-0"
                        onClick={handleTipPost}
                        name={id}
                    >
                        TIP 0.1 ETH
                    </button>
                </li>
            </ul>
        </div>
    );

export default Post;