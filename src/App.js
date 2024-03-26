import React, { useMemo, useRef, useState } from 'react';
import './styles/App.css';
import PostList from './components/PostList.jsx';
import MyButton from './components/UI/button/MyButton.jsx';
import PostForm from './components/PostForm.jsx';
import PostFilter from './components/PostFilter.jsx';
import MyModal from './components/UI/MyModal/MyModal.jsx';

function App() {
	const [posts2, setPosts2] = useState([
		{ id: 1, title: 'aa', body: 'gg' },
		{ id: 2, title: 'dd', body: 'ff' },
		{ id: 3, title: 'ss', body: 'hh' },
	]);

	const [filter, setFilter] = useState({ sort: '', query: '' });
	const [modal, setModal] = useState(false);

	const sortedPosts = useMemo(() => {
		if (filter.sort && posts2.every(post => post[filter.sort])) {
			return [...posts2].sort((a, b) =>
				a[filter.sort].localeCompare(b[filter.sort])
			);
		}
		return posts2;
	}, [filter.sort, posts2]);

	const sortedAndSearchedPosts = useMemo(() => {
		return sortedPosts.filter(post =>
			post.title.toLowerCase().includes(filter.query)
		);
	}, [filter.query, sortedPosts]);

	const createPost = newPost => {
		setPosts2([...posts2, newPost]);
		setModal(false);
	};

	const removePost = post => {
		setPosts2(posts2.filter(p => p.id !== post.id));
	};

	return (
		<div className='App'>
			<hr style={{ margin: 15 }} />
			<PostFilter filter={filter} setFilter={setFilter} />
			<MyButton onClick={() => setModal(true)} style={{ marginTop: '30px' }}>
				Create post
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>
			<PostList
				remove={removePost}
				title={'Posts about Python'}
				posts={sortedAndSearchedPosts}
			/>
		</div>
	);
}

export default App;
