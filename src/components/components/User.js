import React, { useState,useEffect} from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Web3 from 'web3'
import Musicians from '../../abis/Musicians.json'
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import AudioPlayer from 'material-ui-audio-player';

const muiTheme = createMuiTheme({});
const defaultValues = {
  pubaddr:"",
  ipfs:"",
  payment:"",
  payed:false
};
const User = () => {

  const [paymentDone,setPaymentDone] = useState(false);
  const [ipfsHash,setIpfsHash] = useState("");
  const[token,setToken] = useState()

  useEffect(() => {
    (async () => {
      await loadWeb3()
      await loadBlockchainData()
    })()
  }, []);
  const [yo,setYo] = useState()
const [num_musician,setNumMusician] = useState()
  const [Account,SetAccount] = useState()
  async function loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    
    setYo({web3, accounts});
    SetAccount(accounts[0])
    const networkId = await web3.eth.net.getId()
    const daiTokenData = Musicians.networks[networkId]
    
    if(daiTokenData) {
      const daiToken = new web3.eth.Contract(Musicians.abi, daiTokenData.address)
      
      setToken(daiToken)
 
      let num_musician = await daiToken.methods.num_musicians().call()
      setNumMusician(num_musician)

    } else {
      window.alert('DaiToken contract not deployed to detected network.')
    }

  
  }

  async function loadWeb3() {
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


  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {

    const { name, value } = e.target;
    if(name=="ipfs"){
      setIpfsHash("https://ipfs.infura.io/ipfs/"+value);
    }
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    
   
   token.methods.recepients_length(formValues.pubaddr,formValues.ipfs).call({from:Account}).then((result) => {
        const length = parseInt(result)
        const web3 = window.web3
        // console.log(length);
        for(let i=0;i<length;i++){
          token.methods.recepients(formValues.pubaddr,formValues.ipfs,i).call({from:Account}).then((result) => {
            const address = result
            token.methods.payments(formValues.pubaddr,formValues.ipfs,i).call({from:Account}).then((result1) => {
              const payment = result1
              web3.eth.sendTransaction({to:address, from:Account, value:web3.utils.toWei(payment, "ether"),nonce:i+1}).then((result)=>{
                if(i==length-1)
                  setPaymentDone(true);
              })
              

            });
          });
        } 
      
    });

  };
  return (
    <div>
      <Grid>
        <h1 align="center">Enter the Musician's Public Address Key and IPFS Hash Key To Stream the music</h1>
      </Grid>
    {paymentDone && <ThemeProvider theme={muiTheme}>
  <AudioPlayer src={ipfsHash} />
</ThemeProvider>  }
    { !paymentDone &&
      <Grid container alignItems="center" justify="center" direction="column" spacing={2}>
        <Grid item xs={1}>
          <TextField
          	required={true}
            id="pubaddr-input"
            name="pubaddr"
            label="Public Address"
            type="text"
            value={formValues.pubaddr}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={1}>
          <TextField
          	required={true}
            id="ipfs-input"
            name="ipfs"
            label="IPFS Hash"
            type="text"
            value={formValues.ipfs}
            onChange={handleInputChange}
          />
        </Grid>

        <Button onClick={handleSubmit} variant="contained" color="primary" type="submit" >
          Submit
        </Button>
      </Grid>
    }
    </div>
  );
};
export default User;