import { useState, useEffect, useRef } from 'react';
import { useFetching } from '../hooks/useFetching';
import { usePosts } from '../hooks/usePosts';
import { getPagesCount } from '../utils/pages';
import PostService from '../API/PostService';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/MyModal/MyModal';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import Loader from '../components/UI/loader/Loader';
import PostList from '../components/PostList';
import Pagination from '../components/UI/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';

function Posts() {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({ sort: '', query: '' });
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	const lastElement = useRef();

	const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
		const res = await PostService.getAll(limit, page);
		setPosts([...posts, ...res.data]);
		const totalCount = res.headers['x-total-count'];
		setTotalPages(getPagesCount(totalCount, limit));
	});

	useObserver(lastElement, page < totalPages, isPostsLoading, () => {
		setPage(page + 1);
	});

	useEffect(() => {
		fetchPosts();
	}, [page, limit]);

	const createPost = newPost => {
		setPosts([...posts, newPost]);
		setModal(false);
	};

	const removePost = post => {
		setPosts(posts.filter(p => p.id !== post.id));
	};

	const changePage = page => {
		setPage(page);
	};

	return (
		<div className='App'>
			<MyButton onClick={() => setModal(true)} style={{ marginTop: '30px' }}>
				Create post
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>
			<PostFilter filter={filter} setFilter={setFilter} />
			<MySelect
				value={limit}
				onChange={value => setLimit(value)}
				defaultValue={'Количество элементов на странице'}
				options={[
					{ value: 5, name: '5' },
					{ value: 10, name: '10' },
					{ value: 25, name: '25' },
					{ value: -1, name: 'ALL' },
				]}
			/>
			<hr style={{ margin: 15 }} />
			{postError && <h1>Произошла ошибка</h1>}
			<PostList
				remove={removePost}
				title={'Posts about Python'}
				posts={sortedAndSearchedPosts}
			/>
			<div ref={lastElement} style={{ height: 20, background: 'red' }} />
			{isPostsLoading && <Loader />}
			<Pagination page={page} changePage={changePage} totalPages={totalPages} />
		</div>
	);
}

export default Posts;
