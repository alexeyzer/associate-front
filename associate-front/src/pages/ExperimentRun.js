import React, { Component } from 'react';
import {Form, Container,Row,Col, Image } from 'react-bootstrap';
import { connect } from 'react-redux'
import { useParams, useSearchParams  } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import UserAPIservice from "../services/user-api.service";
import { Card } from 'antd'; 

class ExperimentRun extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
		experimentStart:Number(localStorage.getItem('experimentStart')),
		id:"",
		stimuses:[],
		answer:"",
		res:[],
		end:false,
	  };
	  console.log("here")
	  if ( localStorage.getItem('experimentStart') == null) {
		this.state.experimentStart = -1
	  }

	  this.handleChangeSearch = this.handleChangeSearch.bind(this);
	  this.handleClose = this.handleClose.bind(this);
	  this.handleStart = this.handleStart.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  this.handleUpdate = this.handleUpdate.bind(this);
	}
	handleChange(e){
		this.setState({answer:e.target.value});
	}
	handleSubmit(e){
		e.preventDefault();
		console.log("submiting answer", this.state.res);;
		var nnn = {stimusWordId:this.state.stimuses[this.state.experimentStart]?.id, assotiationWord:this.state.answer, timeSpend: 0}
		this.setState({res:[
			...this.state.res,
			nnn,
		]});
		this.setState({answer:""})
		console.log(this.state.experimentStart)
		this.handleUpdate();
		console.log(this.state.experimentStart + 1, this.state.stimuses.length -1)
		if (this.state.experimentStart + 1 > this.state.stimuses.length -1) {
			const answers = this.state.res
			answers.push(nnn)
			console.log(this.state.res)
			console.log("finisj")
			const req = {experimentId: this.state.id, userId: 0, answers: answers}
			UserAPIservice.СreateExperimentAnswer(req).then(
				(result)=>{

				},
				(err)=>{

				}
			)


			//api call to sent data
			this.setState({end:true})
			localStorage.removeItem('experimentStart')
		}
	}
	handleChangeSearch(e) {
		console.log(e.target.value);
	}
	handleClose = () => {
		
	};
	handleUpdate() {
		this.setState({
			experimentStart:this.state.experimentStart+1,
		});
		localStorage.setItem('experimentStart', String(this.state.experimentStart+1));
	}
	handleStart = () => {
		localStorage.setItem('experimentStart', 0)
		this.setState({
			experimentStart:0,
		});
		this.componentDidMount();
		this.forceUpdate();
	};
    componentDidMount(){
        const {id} = this.props.params;
		this.setState({id:id})
		UserAPIservice.GetExperiment(id).then(
			(res)=>{
				this.setState({
					stimuses: res.experimentStimuses,
				});	
			},
			(err)=>{
				console.log(err)
			}
		)


        //get experiment by id
    }
	render() {
		var currentWord = this.state.stimuses[this.state.experimentStart]
		console.log("current", currentWord,"experimentStat", this.state.experimentStart)


		const buildDialog = () => {
			if (this.state.experimentStart == -1) {
				return (
					<>
						<Dialog
							open={true}
							onClose={this.handleClose}
							aria-labelledby="alert-dialog-title"
							aria-describedby="alert-dialog-description"
						>
							<DialogTitle id="alert-dialog-title">
							{"Пожалуйста, приготовьтесь"}
							</DialogTitle>
							<DialogContent>
							<DialogContentText id="alert-dialog-description">
							Ваша задача - свободно выражать первые мысли и ассоциации, которые приходят вам в голову в ответ на предложенные стимулы. Пожалуйста, будьте открытыми и честными в вашей реакции на каждый стимул.
							</DialogContentText>
							</DialogContent>
							<DialogActions>
							<Button style={{backgroundColor:"black", color:"white" }} onClick={this.handleClose}>Обратно</Button>
							<Button style={{backgroundColor:"black", color:"white" }} onClick={this.handleStart} autoFocus>
								Начать
							</Button>
							</DialogActions>
						</Dialog>
					  </>
				);
			}
			return (null);
		}
		const buildDialogEnd = () => {
			if (this.state.end == true) {
				return (
					<>
						<Dialog
							open={true}
							onClose={this.handleClose}
							aria-labelledby="alert-dialog-title"
							aria-describedby="alert-dialog-description"
						>
							<DialogTitle id="alert-dialog-title">
							{"Эксперимент завершён"}
							</DialogTitle>
							<DialogContent>
							<DialogContentText id="alert-dialog-description">
							Спасибо за участие!
							</DialogContentText>
							</DialogContent>
							<DialogActions>
							<Button href="/experiments" style={{backgroundColor:"black", color:"white" }} autoFocus>
								ок
							</Button>
							</DialogActions>
						</Dialog>
					  </>
				);
			}
			return (null);
		}


		const { isLoggedIn, message } = this.props;
      
		return (
			<>
			<br/>
			 <Container>
			 	<Row className="justify-content-md-center">
				 {buildDialog()}
				 {buildDialogEnd()}
				 <Card className="justify-content-md-center" style={{height: '50px', width:'200px'}}>
						<p style={{fontWeight: 'bold', textAlign: "center"}}>{currentWord?.name}</p>
				</Card>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				 <Form className="justify-content-md-center" onSubmit={this.handleSubmit}>
						<TextField label="Введите ассоциацию" fullWidth id="fullWidth" value={this.state.answer} onChange={this.handleChange} />
				 </Form>
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
    

export default withParams(connect(mapStateToProps)(ExperimentRun));
