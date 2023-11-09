import React from 'react';
import {Navbar, Nav, Containe, Col} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faBars, faFlask,faHouse } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {useParams, useSearchParams} from "react-router-dom";
import { logout } from '../actions/user-api.action'

const Styles = styled.div`
.css-1wvake5,  .css-dip3t8 {
  border-radius: 25% 10%;
}
`

export default function SideBar() {
	const navigate = useNavigate()
	const dispath = useDispatch()
	const userApiState = useSelector(state => state.userAPIreducer)
  let [searchParams, setSearchParams] = useSearchParams();
  const querryCreate = (param) => {
    setSearchParams({ linkParam: param });
  }

	const logoutHandler = () => {
		dispath(logout());
	}
    const { collapseSidebar } = useProSidebar();

	return (
    <Col>
      <Styles>
      <Sidebar>
        <Menu>
          <MenuItem component={<Link to="/" />}><FontAwesomeIcon icon={faHouse} /> Главная</MenuItem>
          <MenuItem onClick={()=>{querryCreate("experiments")}}><FontAwesomeIcon icon={faFlask} /> Мои эксперименты</MenuItem>
          <MenuItem onClick={()=>{querryCreate("profile")}}><FontAwesomeIcon icon={faFlask} /> Профиль</MenuItem>
          <MenuItem onClick={()=>{logoutHandler()}}><FontAwesomeIcon icon={faRightFromBracket} /> Выйти</MenuItem>
        </Menu>
      </Sidebar>
      </Styles>
    </Col>
)}