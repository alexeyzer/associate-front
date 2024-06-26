import React, { Component } from 'react';
import {Form, Container} from 'react-bootstrap';
import { login } from '../actions/user-api.action'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';


class Login extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
		email: "",
		password: "",
		loading: false,
		register:false,
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
        },()=>{
			this.setState({
				loading: false
			  });
		})
	
	}
	render() {
		const { isLoggedIn, message } = this.props;

		const siginHandler = () => {
			
		}
		
		return (
			<>
			{isLoggedIn && <Navigate replace to="/profile" />}
			{this.state.register && <Navigate replace to="/register" />}
			<Container style={{width: "70vh"}} className="mt-3" >
				{message && (
              <Form.Group>
                <Container className="alert alert-danger" role="alert">
                  {message}
                </Container>
              </Form.Group>
            )}
		<Form>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Email</Form.Label>
				<Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.onChangeEmail}/>
				<Form.Text className="text-muted">
					Мы не делимся информацией с 3 лицами.
				</Form.Text>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Label>Пароль</Form.Label>
				<Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword}/>
			</Form.Group>
			<Button onClick={this.handleLogin} style={{backgroundColor:"black"}} variant="contained">Войти</Button>
			<Button onClick={()=>{
				this.setState({register:true})
			}} style={{backgroundColor:"black", }} variant="contained">Регистрация</Button>
		</Form>
	</Container>
	</>
	);
	}
}


function mapStateToProps(state) {
	const {isLoggedIn}  = state.userAPIreducer;
	const {message}  = state.message;
	
	return {
	  isLoggedIn,
	  message,
	};
  }

export default connect(mapStateToProps)(Login);