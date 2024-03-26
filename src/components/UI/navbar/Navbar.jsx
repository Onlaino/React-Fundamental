import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context';
import MyButton from '../button/MyButton';

export const Navbar = () => {
	const { setIsAuth } = useContext(AuthContext);

	const logout = () => {
		setIsAuth(false);
		localStorage.removeItem('auth');
	};

	return (
		<div className={'navbar'}>
			<MyButton onClick={logout}>LogOUT</MyButton>
			<div className='navbar_links'>
				<Link to='/about'>О сайте</Link>
				<Link to='/posts'>Посты</Link>
			</div>
		</div>
	);
};
