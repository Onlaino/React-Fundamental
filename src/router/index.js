import PostIdPage from '../pages/PostIdPage';
import Posts from '../pages/Posts';
import About from '../pages/About';
import Login from '../pages/Login';

export const privatRoutes = [
	{ id: 1, path: '/about', element: <About />, expect: true },
	{ id: 2, path: '/posts', element: <Posts />, expect: true },
	{ id: 3, path: '/posts/:id', element: <PostIdPage />, expect: true },
];

export const publicRoutes = [
	{ id: 4, path: '/login', element: <Login />, expect: true },
]
