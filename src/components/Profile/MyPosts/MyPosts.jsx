import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = ({ posts, newPostText, addPost, updateNewPostText}) => {

    let postsElement = posts
        .map((post, index) =>
            <Post
                key={index}
                message={post.message}
                likesCount={post.likesCount}
            />
    );

    let newPostElement = React.createRef();

    let onPostChange = () => {
        let text = newPostElement.current.value;
        updateNewPostText(text);
    };

    return (
        <section className={classes._posts__block}>

            <h3>My post</h3>
            <div>
                <div>
                    <textarea
                        onChange={ onPostChange }
                        ref={ newPostElement }
                        value={ newPostText }
                        placeholder='Enter text'
                        name='field'
                    />
                </div>

                <button
                    onClick={ addPost }
                >
                    Add post
                </button>
            </div>

            <div className={classes._posts}>
                { postsElement }
            </div>

        </section>
    );
};

export default MyPosts;
