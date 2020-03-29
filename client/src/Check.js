import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { TITLE_ABI,TITLE_ADDRESS } from './config'


class Check extends Component{

    componentWillMount() {
        this.loadBlockchainData()
      }
    
      async loadBlockchainData() {
        // const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
        // const accounts = await web3.eth.getAccounts()
        // console.log(accounts)
        // this.setState({ account: accounts[0] })
        // const list = new web3.eth.Contract(TITLE_ABI, TITLE_ADDRESS)
        // this.setState({ list })
    
        // const balance = web3.eth.getBalance(this.state.account)
        // // console.log(balance)
        // const get = await list.methods.registerLand(1,'1','2','3','4',5,6).send({ from: this.state.account , gas:3000000})
        // .once('receipt', (receipt) => {
        //   this.setState({ loading: false })
        // })
     
        // console.log(get)
        
        // const taskCount = await list.methods.getDetails(1).call()
        // console.log(taskCount)
        // this.setState({ taskCount })
        // for (var i = 1; i <= taskCount; i++) {
        // }
      }

      myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
         this.setState({[nam]: val});
      }

      constructor(props) {
        super(props)
        this.state = { account: '' }
        this.checkRegistration=this.checkRegistration.bind(this)
        this.changeOwnership=this.changeOwnership.bind(this)
      }
    

    async checkRegistration(){
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
        const accounts = await web3.eth.getAccounts()
        console.log(accounts)
        this.setState({ account: accounts[0] })
        const list = new web3.eth.Contract(TITLE_ABI, TITLE_ADDRESS)
        this.setState({ list })
        const taskCount = await list.methods.getDetails(this.state.id1).call()
        console.log(taskCount)
       document.getElementById('id').innerHTML=this.state.id1;
       document.getElementById('owner').innerHTML=taskCount[0]
       document.getElementById('land').innerHTML=taskCount[1]
       document.getElementById('district').innerHTML=taskCount[2]
       document.getElementById('municipality').innerHTML=taskCount[3]
       document.getElementById('ward').innerHTML=taskCount[4]
       document.getElementById('plot').innerHTML=taskCount[5]
       
    }   

    
    async changeOwnership(){
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
        const accounts = await web3.eth.getAccounts()
        console.log(accounts)
        this.setState({ account: accounts[0] })
        const list = new web3.eth.Contract(TITLE_ABI, TITLE_ADDRESS)

        const insert = await list.methods.changeOwnership(this.state.id2,this.state.owner).send({ from: this.state.account , gas:3000000})
        .once('receipt', (receipt) => {
          this.setState({ loading: false })
        });
        if(insert)
        {
            alert('Done!')
        }

    }

    render() {
        return (
            <div class='container'>
                <div class='row'>
            <div class='col-md-6 text-center'>
            <h1 class='text-center'>Check Registration</h1>
            <form>
            <div class='form-group'>
            <label>Registration ID</label>
            <input type='number' name='id1' class='form-control' onChange={this.myChangeHandler}/>
            </div>
            <div class='form-group text-center'>
            <input type='button' value='Submit' class='btn btn-primary' onClick={this.checkRegistration}/>
            </div>
            </form>
            <div>
                <table className='table'>
                    <tr>
                    <td>Registration ID</td>
                    <td>Owner</td>
                    <td>Land Type</td>
                    <td>District</td>
                    <td>Municipality</td>
                    <td>Ward No</td>
                    <td>Plot No.</td>
                    </tr>
                    <tr>
                    <td id='id'></td>
                    <td id='owner'></td>
                    <td id='land'></td>
                    <td id='district'></td>
                    <td id='municipality'></td>
                    <td id='ward'></td>
                    <td id='plot'></td>
                    </tr>
                </table>
            </div> 
            </div>
            <div class='col-md-6 text-center'>
                <h1 class='text-center'>Change Ownership</h1>
                <form>
                    <div class='form-group'>
                        <label>Registdation ID</label>
                        <input type='number' name='id2' class='form-control' onChange={this.myChangeHandler}/>
                    </div>
                    <div class='form-group'>
                        <label>Owner</label>
                        <input type='text' name='owner' class='form-control' onChange={this.myChangeHandler}/>
                    </div>
                    <div class='form-group'>
                    <input type='button' value='Submit' class='btn btn-primary' onClick={this.changeOwnership}/>
                    </div>
                </form>
            </div>
            </div>
            </div>
        )
    }    
}
export default Check;
