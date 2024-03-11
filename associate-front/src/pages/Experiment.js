import React, { Component } from 'react';
import {Form, Button, Container,Row,Col, Image } from 'react-bootstrap';
import { connect } from 'react-redux'
import { Graph } from "react-d3-graph";
import { useParams, useSearchParams  } from 'react-router-dom';
import UserAPIservice from "../services/user-api.service";

import ReactDOM from 'react-dom';
import { getLinkUtilityClass } from '@mui/material';
import styled from 'styled-components';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled as styledm, alpha } from '@mui/material/styles';


const Search = styledm('div')(({ theme }) => ({
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
  
  const SearchIconWrapper = styledm('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
  }));

  const StyledInputBase = styledm(InputBase)(({ theme }) => ({
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

const Styles = styled.div`
element.style{
	witdh: 1000px;
    height:500px;
}
`
  
  const onClickLink = function(source, target) {
	window.alert(`Clicked link between ${source} and ${target}`);
  };
  
  // the graph configuration, just override the ones you need
  const myConfig = {
	height: 700,
	width:1250,
	directed: true,
	nodeHighlightBehavior: true,
	node: {
	  color: "lightgreen",
	  size: 120,
	  highlightStrokeColor: "blue",
      labelPosition: "top",
	},
	link: {
      renderLabel: true,
      type:"CURVE_SMOOTH",
	  highlightColor: "lightblue",
	},
  };


class Experiment extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
		id:"",
		link:[],
		nodes:[],
		filter:[],
		search:"",
	  };
	  
	  this.handleChangeSearch = this.handleChangeSearch.bind(this);
	  this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
	  this.onClickNode = this.onClickNode.bind(this);
	  this.buildNode = this.buildNode.bind(this);
	  this.buildLink = this.buildLink.bind(this);
	}
	onClickNode = function(nodeId) {
		console.log(nodeId)
		this.setState({filter:[
			...this.state.filter,
			nodeId,
		]});
		window.alert(`Clicked node ${nodeId}`);
		this.componentDidMount();
		this.forceUpdate();
	  };
	handleChangeSearch(e) {
		this.setState({search:e.target.value});
	}
	handleSubmitSearch(e) {
		console.log(this.state.search)
		this.setState({filter:[
			...this.state.filter,
			this.state.search,
		]});
		this.setState({search:""})
	}
	buildNode(node) {
		return {id: node}
	}
	buildLink(link) {
		return {source: link.stimusWord, target: link.assotiationWord, label: link.amount}
	}
    componentDidMount(){
        const {id} = this.props.params;
		UserAPIservice.GetExperiment(id, 1, 1000, this.state.filter).then(
			(res)=>{
				const nodes = res.nodes.map(this.buildNode)
				const links = res.experimentGrahp.map(this.buildLink)
				this.setState({
					link:links,
					nodes:nodes,
				})
			},
			(err)=>{
				console.log(err)
			}
		)
    }
	render() {
		const { isLoggedIn, message } = this.props;
		const data = {
			nodes: this.state.nodes,
			links: this.state.link,
		  };
      
		return (
			<>
			<Styles>
			 <Container>
			 <Row >
				 <Col>
				 	<Search>
					<SearchIconWrapper onClick={this.handleSubmit}>
					<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
					placeholder="Поиск..."
					inputProps={{ 'aria-label': 'search' }}
					onChange={this.handleChangeSearch}
					onSubmit={this.handleSubmitSearch}
					/>
          			</Search>
				 </Col>
				</Row>
			 	<Row style={{border:"1px solid black", borderRadius: "15px"}}>
				 <Graph
				id="graph-id" // id is mandatory
				data={data}
				config={myConfig}
				onClickNode={this.onClickNode}
				onClickLink={onClickLink}
				/>
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

  function withParams(Component) {
    return (props) => <Component {...props} params={useParams()} />;
    }
    

export default withParams(connect(mapStateToProps)(Experiment));
