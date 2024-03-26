import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';

const PostIdPage = () => {
	const params = useParams();
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);

	const [fetchPostById, isLoading, error] = useFetching(async id => {
		const res = await PostService.getByID(id);
		setPost(res.data);
	});

	const [fetchCommentsById, isCommLoading] = useFetching(
		async id => {
			const res = await PostService.getCommentsByPostId(id);
			setComments(res.data);
		}
	);

	useEffect(() => {
		fetchPostById(params.id);
		fetchCommentsById(params.id);
	}, []);

	return (
		<div>
			<h1>Вы на странице поста с ID = {params.id}</h1>
			{isLoading ? (
				<Loader />
			) : (
				<div style={{ fontSize: 30 }}>
					{(post.id)}. {post.title}
				</div>
			)}
			<h1>Comments</h1>
			{isCommLoading ? (
				<Loader />
			) : (
				<div>
					{comments.map(comm => (
						<div key={comm.id} style={{ marginTop: 15 }}>
							<h4>{comm.email}</h4>
							<div>{comm.body}</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default PostIdPage;
