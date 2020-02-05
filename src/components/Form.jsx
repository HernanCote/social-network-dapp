import React from 'react';

const Form = ({
    handleSubmit,
    handleInputChange,
}) => (
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
    );

export default Form;