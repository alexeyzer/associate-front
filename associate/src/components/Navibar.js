import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { logout } from '../actions/user-api.action';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const Styles = styled.div`
a, .navbar-brand{
	color:  #fff;
	text-decoration: none;
	&:active {
		color: rgba(255, 255, 255, 0.445);
	}
}
.dropdown-toggle {
	color:  #ffff;
}

`

export default function NaviBar() {
	const navigate = useNavigate()
	const dispath = useDispatch()
	const userApiState = useSelector(state => state.userAPIreducer)

	const logoutHandler = () => {
		dispath(logout());
	}

	return (
	<>
	<Styles>
		<Navbar bg="dark" variant="dark">
		<Container>
		<Navbar.Brand><Link to="/" className="BrandLink" id="dropdown-title">Associate</Link></Navbar.Brand>
				{userApiState.isAdmin && (
					<Nav>
					<Nav.Link><Link to="/users">Пользователи</Link></Nav.Link>
					<Nav.Link><Link to="/roles">Роли</Link></Nav.Link>
					</Nav>
				)
				}

				{!userApiState.isLoggedIn &&(
				<Nav className="justify-content-end">
					<Nav.Link><Link to="/login">Войти</Link></Nav.Link>	
					<Nav.Link><Link to="/login">Зарегестрироваться</Link></Nav.Link>	
				</Nav>)}

				{userApiState.isLoggedIn &&(
				<Nav>
					<Nav.Link><Link to="/" onClick={logoutHandler}>Выйти</Link></Nav.Link>	
				</Nav>)}
			</Container>
		</Navbar>
	</Styles>
	</>
)}