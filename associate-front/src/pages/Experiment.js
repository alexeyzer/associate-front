import React, { Component } from 'react';
import {Form, Button, Container,Row,Col, Image } from 'react-bootstrap';
import { connect } from 'react-redux'
import { Graph } from "react-d3-graph";
import { useParams, useSearchParams  } from 'react-router-dom';

import ReactDOM from 'react-dom';

const options = {
    layout: {
      hierarchical: true
    },
    edges: {
      color: "#000000"
    },
    height: "500px"
  };

const events = {
    select: function(event) {
      var { nodes, edges } = event;
    }
};

const onClickNode = function(nodeId) {
	window.alert(`Clicked node ${nodeId}`);
  };
  
  const onClickLink = function(source, target) {
	window.alert(`Clicked link between ${source} and ${target}`);
  };

const data = {
	nodes: [{ id: "Harry"}, { id: "Sally" }, { id: "Alice" }],
	links: [
	  { source: "Harry", target: "Sally",label:"h-s"},
	  { source: "Sally", target: "Harry", label:"s-h" },
	  { source: "Harry", target: "Alice", label:"h-a"},
	],
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
		id:""
	  };
	  
	  this.handleChangeSearch = this.handleChangeSearch.bind(this);
	}
	handleChangeSearch(e) {
		console.log(e.target.value)
	}
    componentDidMount(){
        const {id} = this.props.params;

        //get experiment by id
    }
	render() {
		const { isLoggedIn, message } = this.props;
      
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
