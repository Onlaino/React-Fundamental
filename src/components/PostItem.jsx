import React from 'react';
import MyButton from './UI/button/MyButton';
import { useNavigate } from 'react-router-dom';

const PostItem = props => {
	const navigate = useNavigate();

	return (
		<div className='post'>
			<div className='post_content'>
				<strong>
					{props.posts.id}. {props.posts.title}
				</strong>
				<div>{props.posts.body}</div>
				<div className='post_btns'>
					<MyButton onClick={() => props.remove(props.posts)}>Delete</MyButton>
					<MyButton onClick={() => navigate(`/posts/${props.posts.id}`)}>
						Open post
					</MyButton>
				</div>
			</div>
		</div>
	);
};

export default PostItem;
