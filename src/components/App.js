import React, { Component } from 'react'
import Web3 from 'web3'
import TodoList from '../abis/TodoList.json'
import Navbar from './Navbar'
import FormTodo from './FormTodo'
import Todo from './Todo'
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    console.log("oooooo")
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    // Load DaiToken
    const TodoListData = TodoList.networks[networkId]
    if(TodoListData) {
      const todolisttoken = new web3.eth.Contract(TodoList.abi, TodoListData.address)
      this.setState({token:todolisttoken})
      console.log(this.state.token)
      // this.setState({ todolisttoken })
      console.log(todolisttoken.methods)
      let taskcount = await todolisttoken.methods.taskCount().call();
      // let daiTokenBalance = await todolisttoken.methods.balanceOf(this.state.account).call()
      this.setState({ taskCount: taskcount  })
      for(var i=1;i<=taskcount;i++){
        const task_n = await todolisttoken.methods.tasks(i).call();
        this.setState({tasks:[...this.state.tasks,task_n]})
      }
    } else {
      window.alert('DaiToken contract not deployed to detected network.')
    }

   

    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
createTask=async (value)=>{
  // this.componentWillMount() 
  console.log(this.state)
    let abc = await this.state.token.methods.createTask(value).send({ from: this.state.account });
       let tokenCount = await this.state.token.methods.taskCount().call();
      // console.log(tokenCount+" ll");
      const task_n = await this.state.token.methods.tasks(tokenCount).call();
      this.setState({tasks:[...this.state.tasks,task_n]})
        // this.props.tasks=[...this.props.tasks,task_n]
  }
  
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      taskCount:0,
      loading: true,
      token:1,
      tasks:[]
    }


  }

  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {

      content = <p className="text-center">{this.state.taskCount}</p>
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <FormTodo token={this.state.token} taskCount = {this.state.taskCount} handleSubmit={this.handleSubmit} account={this.state.account} tasks={this.state.tasks} createTask={this.createTask}/>
        <div>
          {this.state.tasks.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo
                key={index}
                index={index}
                todo={todo}
                // markTodo={markTodo}
                // removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;