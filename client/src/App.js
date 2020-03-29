import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { TITLE_ABI,TITLE_ADDRESS } from './config'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
  
    // console.log(balance)
    // const get = await list.methods.registerLand(1,'1','2','3','4',5,6).send({ from: this.state.account , gas:3000000})
    // .once('receipt', (receipt) => {
    //   this.setState({ loading: false })
    // })
 
    // console.log(get)
    
    // const taskCount = await list.methods.getDetails(1).call()
    // console.log(taskCount)
   
  }

  constructor(props) {
    super(props)
    this.state = { account: '',id:'', }
    this.mySubmitHandler = this.mySubmitHandler.bind(this)
    this.myChangeHandler = this.myChangeHandler.bind(this)
  }


  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
     this.setState({[nam]: val});
    console.log(this.state.id)
  }

  async mySubmitHandler()
  {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({ account: accounts[0] })
    const list = new web3.eth.Contract(TITLE_ABI, TITLE_ADDRESS)
    const balance = web3.eth.getBalance(this.state.account)
    this.setState({list:list}) 

    console.log(this.state.id);
    const insert = await list.methods.registerLand(this.state.id,this.state.owner,this.state.land,this.state.district,this.state.municipality,this.state.ward,this.state.plot).send({ from: this.state.account , gas:3000000})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    });
    console.log(insert);
    if(insert)
    {
      alert('Done!')
    }
  }
  
  render() {
    return (
      <div className="container">
        <h1 className='text-center' >Register Land</h1>
        {/* <p>{this.state.task['name']}</p> */}
        <form>
          <div className='form-group'>
          <label>Registration ID</label>
          <input type='number' name='id' className='form-control' onChange={this.myChangeHandler} />
          </div>
          <div className='form-group'>
            <label>Owner</label>
          <input type='text' name='owner' className='form-control' onChange={this.myChangeHandler}/>
          </div>
          <div className='form-group'>
            <label>Land Type</label>
          <input type='text' name='land' className='form-control' onChange={this.myChangeHandler}/>
          </div>
          <div className='form-group'>
            <label>District</label>
          <input type='text' name='district'className='form-control' onChange={this.myChangeHandler}/>
          </div>
          <div className='form-group'>
            <label>Municipality</label>
          <input type='text' name='municipality' className='form-control' onChange={this.myChangeHandler}/>
          </div>
          <div className='form-group'>
            <label>Ward No</label>
          <input type='number' name='ward' className='form-control' onChange={this.myChangeHandler}/>
          </div>
          <div className='form-group'>
            <label>Plot No</label>
          <input type='number' name='plot' className='form-control' onChange={this.myChangeHandler}/>
          </div>
          <div className='form-group text-center'>
          <input  value='Submit' type='button' className='btn btn-primary' onClick={this.mySubmitHandler}/>
          </div>
        </form>
      </div>  
    );
  }
}

export default App;