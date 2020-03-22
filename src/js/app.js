const truffleContract = require('truffle-contract');
const moment = require('moment');

const watchProvider = require('./provider.helper');
const generateHash = require('./hash.helper');


const source = require('../../build/contracts/landTitle.json');


let instance = null //contract instance
let account = null //current account
let network = 'ropsten' //by default

//contract addresse of different network
let addresses = {
  localhost: '0x35c2268CA50Cb51163E0603c4025C55bAc0608Ad',
  rinkeby: '',
  kovan: '',
  ropsten: '0x4b637213220501ad0543975D5F083a9976eB780c',
  mainnet: ''
}

//wait for metamask
window.addEventListener('load', onLoad)


async function onLoad () {
  try {
    await init()
  } 
  catch (error) {
    alert(error.message)
    console.log(error);
  }
}


//initializing contract
async function init () {
  contract=truffleContract(source);
  console.log("displaying contract",contract)

  provider=watchProvider.getProvider()
  contract.setProvider(provider)

  contractAddress=addresses[network]

  instance= await contract.at(contractAddress)
  console.log(instance);

  account=await watchProvider.getAccount()
  console.log(account)
  
  if(!window.web3){
    window.web3= new window.Web3(provider)
  }

}



//update the account when the current account is changed in metamask
window.ethereum.on('accountsChanged', async function (accounts) {
  console.log(accounts);
  account = await watchProvider.getAccount()
  init();
})



//Certify your Document



const stampFileInput = document.querySelector('#stampFile')
const stampOutHash = document.querySelector('#stampHash')

const stampForm = document.querySelector('#stampForm')
stampFileInput.addEventListener('change', handleStampFile, false)
stampForm.addEventListener('submit', handleStampForm, false)


//get a file name and generate hash
async function handleStampFile (event) {
  console.log("handling")
  stampOutHash.value = ''
  const file = event.target.files[0]
  const hash = await generateHash.fileToSha3(file)

  stampOutHash.value = hash
}


async function handleStampForm (event) {
  event.preventDefault()
  const target = event.target

  if (!account) {
    alert('Metamask not Connected');
    return false
  }

  const hash = stampOutHash.value

  if (!hash) {
    alert('Please select the document')
    return false
  }

  target.classList.toggle('loading', true)
  await stampDoc(hash)
  target.classList.toggle('loading', false)
}

//recording file to Smart contract
async function stampDoc (hash) {
  try{
    console.log(account)
    const exist=await instance.exists(hash,{from:account})
    if(exist)
    {
      alert('This doc alreaady exsists')
      return false
    }

    const value= await instance.recordFile(hash,{from:account,gasLimit:30000})
    console.log("value",value);
    alert('Successfully certified document, Now your Certificates')
  }catch(error){
    alert(error)
  }




}


//Check certified Document

const checkForm = document.querySelector('#checkForm')
const checkFile = document.querySelector('#checkFile')
const checkHash = document.querySelector('#checkHash')
const checkStamper = document.querySelector('#checkStamper')
const checkDatetime = document.querySelector('#checkDatetime')
checkFile.addEventListener('change', handleCheckFile, false)
checkForm.addEventListener('submit', handleCheckForm, false)

async function handleCheckFile (event) {
  checkHash.value = ''
  const file = event.target.files[0]

  const hash = await generateHash.fileToSha3(file)
  checkHash.value = hash
}

async function handleCheckForm (event) {
  event.preventDefault()

  checkStamper.value = ''
  checkDatetime.value = ''

  const hash = checkHash.value

  if (!hash) {
    alert('Please select the document')
    return false
  }

  const exists = await instance.exists(hash, {from: account})

  if (!exists) {
    alert('Document does not exist in smart contract')
    return false
  }


  //checking Recorder
  try {
    const stamper=await instance.getRecorder(hash,{from:account})
    const timestamp=await instance.getTimestamp(hash,{from:account})   
    const date=moment.unix(timestamp).format('YYYY-MM-DD hh:mmA')

    checkStamper.value=stamper
    checkDatetime.value=date
  } catch (error) {
    alert(error)
  }
}





