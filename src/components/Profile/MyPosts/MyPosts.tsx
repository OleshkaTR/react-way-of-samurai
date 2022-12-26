import React, {ChangeEvent, FC} from 'react';

import classes from './MyPosts.module.css';
import Post from './Post/Post';
import {PostType} from '../../../types/types';

export type MapPropsType = {
    posts: Array<PostType>
    newPostText: string
}
export type DispatchPropsType = {
    addPost: () => void
    updateNewPostText: (text: string) => void
};

const MyPosts: FC<MapPropsType & DispatchPropsType> = ({ posts, newPostText, addPost, updateNewPostText}) => {

    let postsElement = posts
        .map((post, index) =>
            <Post
                key={index}
                message={post.message}
                likesCount={post.likesCount}
            />
    );

    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.target.value;
        updateNewPostText(text);
    };

    return (
        <section className={classes._posts__block}>

            <h3>My post</h3>
            <div>
                <div>
                    <textarea
                        onChange={ onPostChange }
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
