import React, { Component } from 'react';
import {Form, Button, Container,Row,Col, Image } from 'react-bootstrap';
import { connect } from 'react-redux'
import { Graph } from "react-d3-graph";
import { useParams, useSearchParams  } from 'react-router-dom';
import UserAPIservice from "../services/user-api.service";

import ReactDOM from 'react-dom';
import { getLinkUtilityClass } from '@mui/material';


const onClickNode = function(nodeId) {
	window.alert(`Clicked node ${nodeId}`);
  };
  
  const onClickLink = function(source, target) {
	window.alert(`Clicked link between ${source} and ${target}`);
  };
  
  // the graph configuration, just override the ones you need
  const myConfig = {
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
	  };
	  
	  this.handleChangeSearch = this.handleChangeSearch.bind(this);
	  this.buildNode = this.buildNode.bind(this);
	  this.buildLink = this.buildLink.bind(this);
	}
	handleChangeSearch(e) {
		console.log(e.target.value)
	}
	buildNode(node) {
		return {id: node}
	}
	buildLink(link) {
		return {source: link.stimusWord, target: link.assotiationWord, label: link.amount}
	}
    componentDidMount(){
        const {id} = this.props.params;
		UserAPIservice.GetExperiment(id).then(
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
        //get experiment by id
    }
	render() {
		const { isLoggedIn, message } = this.props;
		const data = {
			nodes: this.state.nodes,
			links: this.state.link,
		  };
      
		return (
			<>
			 <Container>
			 	<Row>
				 <Graph
				id="graph-id" // id is mandatory
				data={data}
				config={myConfig}
				onClickNode={onClickNode}
				onClickLink={onClickLink}
				/>
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
    

export default withParams(connect(mapStateToProps)(Experiment));
