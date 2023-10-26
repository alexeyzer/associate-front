import React, { Component } from 'react';
import {Form, Container,Row,Col, Image } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { login } from '../actions/user-api.action'
import AlignItemsList from '../components/AlignItemsList'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom';
import logo from '../images/mainPageImage3.jpg';
import { Card } from 'antd'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faFlask,faUsers } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

const Styles = styled.div`
.MuiButtonBase-root {
	background-color: black	
}
`

class Main extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
		email: "",
		password: "",
		loading: false,
	  };
	  
	  this.handleLogin = this.handleLogin.bind(this);
	  this.onChangeEmail = this.onChangeEmail.bind(this);
	  this.onChangePassword = this.onChangePassword.bind(this);
	}
	onChangeEmail(e) {
		this.setState({
			email: e.target.value,
		});
	  }
	  onChangePassword(e) {
		this.setState({
			password: e.target.value,
		});
	  }
	handleLogin(e) {
	  e.preventDefault();

	  this.setState({
		loading: true,
	  });
	  const { dispatch } = this.props;

	  console.log(this.state.email, this.state.password)
	  dispatch(login(this.state.email, this.state.password)).then(() => {
		this.setState({
			loading: false,
		  });
        }).Catch(() => {
			this.setState({
				loading: false
			  });
        })
	
	}
	render() {
		const { isLoggedIn, message } = this.props;
		
		return (
			<>
			<br/>
			<br/>
			<Styles>
			 <Container>
				<Row className="justify-content-md-center"> 
					<Col sm={5}>
						<h1>Откройте<br/> мир<br/> ассоциаций</h1>
						<br/>
						<br/>
						<Button href="/experiments" style={{backgroundColor:"black", }} variant="contained">Начать сейчас</Button>
						</Col>
					<Col sm={4}> <Image src={logo} roundedCircle style={{ width: '80%' }}/></Col>
				</Row>
				<br/>
				<Row className="justify-content-md-center">
					<Col sm={5}>
						<h2>Исследуйсте различные<br/> ассоциации в нашем<br/>сервисе</h2>
						</Col>
					<Col sm={4}> <Image src={""} roundedCircle /></Col>
				</Row>
				<br/>
				<br/>
				<Row className="justify-content-md-center">
					<Col sm={5}>
					<Card style={{height: '125px'}}>
						<p style={{fontWeight: 'bold', fontSize: 25, textAlign: "center"}}>1000+</p>
						<p style={{textAlign: "center"}}>Экспериментов проведено</p>
					</Card>
					</Col>
					<Col sm={2}>
					<Card style={{height: '125px', fontSize: 30, textAlign: "center"}}>
						<FontAwesomeIcon icon={faFlask} size="2xl" />
					</Card>
					</Col>
				</Row>
				<br/>
				<Row className="justify-content-md-center">
				<Col sm={2}>
					<Card style={{height: '125px', fontSize: 30, textAlign: "center"}}>
					<FontAwesomeIcon icon={faUsers} size="2xl" />
					</Card>
					</Col>
					<Col sm={5}>
					<Card style={{height: '125px'}}>
						<p style={{fontWeight: 'bold', fontSize: 25, textAlign: "center"}}>500</p>
						<p style={{ textAlign: "center"}}>Уникальных участников</p>
					</Card>
					</Col>
				</Row>
			 </Container>
			 </Styles>
			</>
	);
	}
}


function mapStateToProps(state) {
	const {isLoggedIn}  = state.userAPIreducer;
	const {message}  = state.message;
	return {
	  isLoggedIn,
	  message
	};
  }

export default connect(mapStateToProps)(Main);