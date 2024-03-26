import React, { useEffect, useContext } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { publicRoutes, privatRoutes } from '../router';
import { AuthContext } from '../context';
import Loader from './UI/loader/Loader';

const AppRouter = () => {
	const { isAuth, isLoading } = useContext(AuthContext);

	if (isLoading) return <Loader/>

	return isAuth ? (
		<Routes>
			{privatRoutes.map(route => (
				<Route
					key={route.id}
					path={route.path}
					element={route.element}
					exact={route.exact}
				/>
			))}
			<Route path='*' element={<Navigate replace to='/posts' />} />
		</Routes>
	) : (
		<Routes>
			{publicRoutes.map(route => (
				<Route
					key={route.id}
					path={route.path}
					element={route.element}
					exact={route.exact}
				/>
			))}
			<Route path='*' element={<Navigate replace to='/login' />} />
		</Routes>
	);
};

export default AppRouter;
