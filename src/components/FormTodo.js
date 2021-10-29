import React, { Component } from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3'

class FormTodo extends Component{
  constructor(props) {
    super(props)
    this.state = {
      value:"",
    }
    // this.createTask = this.createTask.bind(this)
    
  }
  createTask=(e)=>{
    e.preventDefault();
      // if (!value) return;
      // addTodo(value);
      // setValue("");
      // console.log(this.props);
      // console.log(this.props.taskCount)
      // console.log(this.props.token);
      // var voteCast = someContract.voteCast();
// voteCast.watch(function(err, result) {/* some callback */});
      // let tokenCount = await this.props.token.methods.taskCount().call();
      // console.log(tokenCount+" ll"+this.state.value);
      this.props.createTask(this.state.value)
      
    
    }

  
  render(){
    return (
      <Form onSubmit={this.createTask}> 
      <Form.Group>
        <Form.Label><b>Add Todo</b></Form.Label>
        <Form.Control type="text" className="input" value={this.state.value} onChange={e => this.setState({value:e.target.value})} placeholder="Add new todo" />
      </Form.Group>
      <Button variant="primary mb-3" type="submit">
        Submit
      </Button>
    </Form>

    );
  }
}

export default FormTodo; 