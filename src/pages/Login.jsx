import React, { useContext } from 'react';
import MyInput from '../components/UI/input/MyInput';
import MyButton from '../components/UI/button/MyButton';
import { AuthContext } from '../context';

const Login = () => {
	const { setIsAuth } = useContext(AuthContext);

	const login = e => {
		e.preventDefault();
		setIsAuth(true);
		localStorage.setItem('auth', 'true');
	};

	return (
		<div>
			<h1>страница для логина</h1>
			<form onSubmit={login}>
				<MyInput type='text' placeholder='type login' />
				<MyInput type='current-password' placeholder='type password' />
				<MyButton>LogIN</MyButton>
			</form>
		</div>
	);
};

export default Login;
