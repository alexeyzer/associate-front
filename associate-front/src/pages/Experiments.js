import React, { Component } from 'react';
import {Form, Button, Container,Row,Col, Image } from 'react-bootstrap';
import Pagination from '@mui/material/Pagination';
import { login } from '../actions/user-api.action'
import AlignItemsList from '../components/AlignItemsList'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom';
import logo from '../images/mainPageImage2.png';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useParams, useSearchParams  } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import UserAPIservice from "../services/user-api.service";


const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
	  backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
	  marginLeft: theme.spacing(1),
	  width: 'auto',
	},
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
	  padding: theme.spacing(1, 1, 1, 0),
	  // vertical padding + font size from searchIcon
	  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
	  transition: theme.transitions.create('width'),
	  width: '100%',
	  [theme.breakpoints.up('sm')]: {
		width: '12ch',
		'&:focus': {
		  width: '20ch',
		},
	  },
	},
  }));


class Experiments extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
		number:1,
		limit:10,
		experiments:[]
	  };
	  
	  this.handleChangeSearch = this.handleChangeSearch.bind(this);
	  this.handleChangePagination = this.handleChangePagination.bind(this);
	}
	handleChangeSearch(e) {
		UserAPIservice.ListExperiment(this.state.number, this.state.limit, e.target.value).then(
			(resp)=>{
				this.setState({experiments:resp.experiments })
			},
			(error)=>{
				console.log(error)
			}
		)
		this.forceUpdate()
	}
	handleChangePagination(event, value) {
		console.log(event)
		console.log(value)
		this.setState({number:value})
		UserAPIservice.ListExperiment(value, this.state.limit, "").then(
			(resp)=>{
				this.setState({experiments:resp.experiments})
			},
			(error)=>{
				console.log(error)
			}
		)
		this.forceUpdate()
	}
	componentDidMount(){
		UserAPIservice.ListExperiment(this.state.number, this.state.limit, "", this.props.userExperiments).then(
			(resp)=>{
				this.setState({experiments:resp.experiments})
			},
			(error)=>{
				console.log(error)
			}
		)
	}
	render() {
		

		const { isLoggedIn, message } = this.props;
		return (
			<>
			 <Container>
				<br/>
			 	<Row >
				 <Col>
				 	<Search>
					<SearchIconWrapper>
					<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
					placeholder="Поиск..."
					inputProps={{ 'aria-label': 'search' }}
					onChange={this.handleChangeSearch}
					/>
          			</Search>
				 </Col>
				</Row>
				<Row className="justify-content-md-center">
					<AlignItemsList experiments={this.state.experiments}></AlignItemsList>
				</Row>
				<Row >
					<Col className="justify-content-md-center">
					<Pagination count={10} page={this.state.number} onChange={this.handleChangePagination} />
					</Col>
				</Row>
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
	  message
	};
  }

function withParams(Component) {
return (props) => <Component {...props} params={useParams()} />;
}

export default withParams(connect(mapStateToProps)(Experiments));