import React from 'react';
import MyButton from './UI/button/MyButton';

const PostItem = props => {
	return (
		<div className='post'>
			<div className='post_content'>
				<strong>
					{props.number}.{props.posts.title}
				</strong>
				<div>{props.posts.descr}</div>
				<div className='post_btns'>
					<MyButton onClick={() => props.remove(props.posts)}>Delete</MyButton>
				</div>
			</div>
		</div>
	);
};

export default PostItem;
