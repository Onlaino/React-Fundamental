import React from 'react';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';
import { useState } from 'react';

const PostForm = ({ create }) => {
	const [post, setPost] = useState({
		title: '',
		descr: '',
	});

	const addNewPost = e => {
		e.preventDefault();
		const newPost = {
			...post,
			id: Date.now(),
		};
		create(newPost);
		setPost({ title: '', descr: '' });
	};

	return (
		<form>
			<MyInput
				onChange={e => setPost({ ...post, title: e.target.value })}
				value={post.title}
				type='text'
				placeholder='name post'
			/>
			<MyInput
				onChange={e => setPost({ ...post, descr: e.target.value })}
				value={post.descr}
				type='text'
				placeholder='descr post'
			/>
			<MyButton onClick={addNewPost}>Add post</MyButton>
		</form>
	);
};

export default PostForm;
