import React, { Component, useCallback, useState } from "react";
import { Form, Container } from "react-bootstrap";
import { login } from "../actions/user-api.action";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import Button from "@mui/material/Button";

export const Login = ({ dispath, isLoggedIn, message }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const onChangeEmail = useCallback((e) => {
		setEmail(e.target.value);
	}, []);

	const onChangePassword = useCallback((e) => {
		setPassword(e.target.value);
	}, []);

	const handleLogin = useCallback(async (e) => {
		e.preventDefault();
		setLoading(true);

		console.log(email, password);
		try {
			await dispath(login(email, password));
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, []);

	return (
		<>
			{isLoggedIn && <Navigate replace to="/profile" />}
			<Container style={{ width: "70vh" }} className="mt-3">
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
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={onChangeEmail}
						/>
						<Form.Text className="text-muted">
							Мы не делимся информацией с 3 лицами.
						</Form.Text>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Пароль</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							value={password}
							onChange={onChangePassword}
						/>
					</Form.Group>
					<Button
						onClick={handleLogin}
						style={{ backgroundColor: "black" }}
						variant="contained"
					>
						Войти/Зарегестрироваться
					</Button>
				</Form>
			</Container>
		</>
	);
};

function mapStateToProps(state) {
	const { isLoggedIn } = state.userAPIreducer;
	const { message } = state.message; 
	const { dispatch } = state.dispatch; 
	return {
		isLoggedIn,
		message,
		dispatch,
	};
}

export default connect(mapStateToProps)(Login);
