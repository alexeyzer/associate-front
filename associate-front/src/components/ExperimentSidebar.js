import React from 'react';
import {Navbar, Nav, Containe, Col} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faBars, faFlask,faHouse, faDiagramProject, faMagnifyingGlass, faRuler, faCircleInfo} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {useParams, useSearchParams} from "react-router-dom";
import { logout } from '../actions/user-api.action'

const Styles = styled.div`
.css-1wvake5,  .css-dip3t8 {
  border-radius: 25% 10%;
}
`

export default function ExperimentSideBar() {
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
    <Col xs={6} md={4}>
       <br/>
			 <br/>
      <Styles>
      <Sidebar>
        <Menu>
          <MenuItem onClick={()=>{querryCreate("")}}><FontAwesomeIcon icon={faDiagramProject} /> Граф эксперимента</MenuItem>
          <MenuItem onClick={()=>{querryCreate("long")}}><FontAwesomeIcon icon={faRuler} /> Список наиболее длинных ассоциаций</MenuItem>
          <MenuItem onClick={()=>{querryCreate("information")}}><FontAwesomeIcon icon={faCircleInfo} /> Информация</MenuItem>
          <MenuItem onClick={()=>{querryCreate("find")}}><FontAwesomeIcon icon={faMagnifyingGlass} /> Поиск</MenuItem>
        </Menu>
      </Sidebar>
      </Styles>
    </Col>
)}