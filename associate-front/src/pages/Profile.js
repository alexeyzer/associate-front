import {React, Component} from 'react';
import {useSelector} from 'react-redux'
import { Navigate } from 'react-router';
import {Nav, Row, Col, Container, Button} from 'react-bootstrap';
import UserAPIservice from "../services/user-api.service";
import {Link} from 'react-router-dom';
import {useParams, useSearchParams} from "react-router-dom";
import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar'
import { Card } from 'antd'; 


function withParams(Component) {
    return props => <Component {...props} params={useParams()} url = {useSearchParams()} />;
}

class Profile extends Component{
	constructor(props){
        super(props);
            this.state = {
            };
		this.querryCreate = this.querryCreate.bind(this);     
    }

	querryCreate(param){
		const [searchParams, setSearchParams] = this.props.url;
		setSearchParams({ linkParam: param });
	}
	render(){
		const { isLoggedIn, user } = this.props;
		const [searchParams, setSearchParams] = this.props.url;
		 let param = searchParams.get("linkParam")
		console.log(param)
	return (
	<>
	{!isLoggedIn && <Navigate replace to="/login" />}
	{isLoggedIn && <Container>
	<br/>
	<Row>
	<Sidebar/>
	<Col>
		Здраствуйте! {user?.name}
	</Col>
	</Row>
	</Container>}
	
	</>
	)
	}
	}
	function mapStateToProps(state) {
		const {isLoggedIn, user}  = state.userAPIreducer;
		const {message}  = state.message;
		return {
		  isLoggedIn,
		  message,
		  user
		};
	  }
	  export default withParams(connect(mapStateToProps)(Profile));