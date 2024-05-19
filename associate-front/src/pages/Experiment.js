import React, { Component } from 'react';
import {Form, Container,Row,Col, Image } from 'react-bootstrap';
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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import logo from '../images/itemListIcon.png';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import Button from '@mui/material/Button';
import ChainList from '../components/ChainList';
import ChainsMap from '../components/ChainsMap';
import ExperimentSideBar from '../components/ExperimentSidebar';
import ExperimentDetails from '../components/ExperimentDetails';
import SearchPaths from '../components/SearchPaths';

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
	witdh: 600px;
    height:500px;
}
`
  
  const onClickLink = function(source, target) {
	window.alert(`Clicked link between ${source} and ${target}`);
  };
  
  // the graph configuration, jcdust override the ones you need
  const myConfig = {
	staticGraphWithDragAndDrop: false,
	panAndZoom: false,
	focusAnimationDuration: 0,
	height: 800,
	width:838,
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
		longestChains:[],
		findWord: {},
		experimentData: null,
	  };
	  
	  this.handleChangeSearch = this.handleChangeSearch.bind(this);
	  this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
	  this.onClickNode = this.onClickNode.bind(this);
	  this.buildNode = this.buildNode.bind(this);
	  this.buildLink = this.buildLink.bind(this);
	  this.alignFilterItemsList = this.alignFilterItemsList.bind(this);
	  this.buildListItem = this.buildListItem.bind(this);
	  this.deleteFilter = this.deleteFilter.bind(this);
	}
	deleteFilter(event, filter) {
		console.log(filter);
		let filternew = this.state.filter.filter(item => item !== filter)
		this.setState({
			filter:filternew
		}, ()=>{
			window.alert(`Фильтр удален`);
			this.componentDidMount();
			this.forceUpdate();
		});
	}
	buildListItem(filter) {
		return (
		  <>
		   <ListItem style={{border:"1px solid black", borderRadius: "15px"}}
                  secondaryAction={
                    <IconButton onClick={(e) => {
						this.deleteFilter(e, filter);
					 }} edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={filter}
                  />
                </ListItem>
				<br></br>
			</>
		);
	  }
	  alignFilterItemsList(filters) {
		return (
		  <List sx={{bgcolor: 'background.paper' }}>
			{filters.map((el, i) => this.buildListItem(el))}
		  </List>
		);
	  }
	onClickNode = function(nodeId) {
		console.log(nodeId)
		this.setState({filter:[
			...this.state.filter,
			nodeId,
		]},()=>{
			this.componentDidMount();
			this.forceUpdate();
		});
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
		this.setState({search:""}, ()=>{
			this.componentDidMount();
			this.forceUpdate();
		})
	}
	buildNode(node) {
		let color = "" 
		if(this.state.filter.includes(node.name)) {
			color = "red"
		}

		return {id: node.name, color: color, x: node.x, y:Node.y}
	}
	buildLink(link) {
		return {source: link.stimusWord, target: link.assotiationWord, label: link.amount}
	}
    componentDidMount(){
		console.log("filter", this.state.filter)
        const {id} = this.props.params;
		UserAPIservice.GetExperimentCalculated(id, 1, 700, this.state.filter).then(
			(res)=>{
				const nodes = res.nodes.map(this.buildNode)
				const links = res.experimentGrahp.map(this.buildLink)
				this.setState({
					link:links,
					nodes:nodes,
					longestChains:res.longestChains,
					findWord: res.findWords,
				})
			},
			(err)=>{
				console.log(err)
			}
		)
		UserAPIservice.GetExperiment(id, 1, []).then(
			(res)=>{
				this.setState({
					experimentData:res,
				})
			},
			(err)=>{
				console.log(err)
			}
		)
    }
	render() {

		const [searchParams, setSearchParams] = this.props.url;
		let param = searchParams.get("linkParam")
		console.log(param)
		const { isLoggedIn, message } = this.props;
		const {id} = this.props.params;
		const data = {
			nodes: this.state.nodes,
			links: this.state.link,
		  };
      
		return (
			<>
			<Styles>
			 <Container>

			<Row>

			<ExperimentSideBar></ExperimentSideBar>

			<Col xs={12} md={8}>
			 <br/>
			 <br/>

			 {(param === null || param === "") &&
			 <>
			  <Row >

				 <Col>
				 <br/>
				 	<Search>
					<SearchIconWrapper onClick={this.handleSubmit}>
					<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
					placeholder="Поиск..."
					value={this.state.search}
					inputProps={{ 'aria-label': 'search' }}
					onChange={this.handleChangeSearch}
					onSubmit={this.handleSubmitSearch}
					/>
          			</Search>
					  <br/>
				 </Col>

				 <Col>
				 <br/>
					<Button onClick={this.handleSubmitSearch} style={{backgroundColor:"black", textColor:"white"}} variant="contained">Поиск</Button>
				<br/>
				</Col>

				<br/>
				<br/>
			</Row>

			<Row>
				 <Col style={{width:600, border:"1px solid black", borderRadius: "15px"}}>
				 <Graph
				id="graph-id" // id is mandatory
				data={data}
				config={myConfig}
				onClickNode={this.onClickNode}
				onClickLink={onClickLink}
				/>
				</Col>
			</Row></>}

			{((param === null || param === "") && this.state.filter.length) > 0 &&<>
			<Row>
			<h3>Выбранные фильтры:</h3>
				{this.alignFilterItemsList(this.state.filter)}
			</Row>
			<Row >
			<ChainsMap map={this.state.findWord} />
			</Row></>}

			{param==="long" &&
			<Row >
					<ChainList longestChains={this.state.longestChains} />
			</Row>}

			{param==="information" &&
			 <ExperimentDetails experiment={this.state.experimentData}></ExperimentDetails>

			}

			{param==="find" &&
			<SearchPaths experimentId={id}></SearchPaths>

			}

			

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

function withParams(Component) {
    return props => <Component {...props} params={useParams()} url = {useSearchParams()} />;
}

	
    

export default withParams(connect(mapStateToProps)(Experiment));
