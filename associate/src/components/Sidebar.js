import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import { logout } from '../actions/user-api.action';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faFlask } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export default function SideBar() {
	const navigate = useNavigate()
	const dispath = useDispatch()
	const userApiState = useSelector(state => state.userAPIreducer)

	const logoutHandler = () => {
		dispath(logout());
	}
    const { collapseSidebar } = useProSidebar();

	return (
	<>
    <div style={{ display: 'flex', height: '100%', position: "fixed" }}>
      <Sidebar >
        <Menu>
          <MenuItem  onClick={() => collapseSidebar()}><FontAwesomeIcon icon={faBars} /></MenuItem>
          <MenuItem component={<Link to="/experiments" />}><FontAwesomeIcon icon={faFlask} /> Эксперименты</MenuItem>
          <MenuItem> E-commerce</MenuItem>
        </Menu>
      </Sidebar>
    </div>
	</>
)}