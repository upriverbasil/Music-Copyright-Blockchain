import React, { useState,useEffect} from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Web3 from 'web3'
import Musicians from '../../abis/Musicians.json'
const defaultValues = {
  pubaddr:"",
  ipfs:"",
  payment:"",
  payed:false
};
const User = () => {


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
    // this.setState({ account: accounts[0] })
    setYo({web3, accounts});
    SetAccount(accounts[0])
    const networkId = await web3.eth.net.getId()
    const daiTokenData = Musicians.networks[networkId]
    console.log(daiTokenData)
    if(daiTokenData) {
      const daiToken = new web3.eth.Contract(Musicians.abi, daiTokenData.address)
      console.log(daiToken)
      setToken(daiToken)
      console.log(daiToken,"ll")
      let num_musician = await daiToken.methods.num_musicians().call()
      setNumMusician(num_musician)
      // this.setState({ daiToken })
      // let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call()
      // this.setState({ daiTokenBalance: daiTokenBalance.toString() })
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
    
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    
   console.log(formValues.pubaddr,formValues.ipfs)
   token.methods.musician(formValues.pubaddr,formValues.ipfs).call({from:Account}).then((result) => {
      
        console.log(result);
        const web3 = window.web3
        console.log(result[3],result[4])
        web3.eth.sendTransaction({to:result[3], from:Account, value:web3.utils.toWei(result[4], "ether")})
        // console.log(result.dna);
      
    }); 
   token.methods.all_ipfs_hash(0).call({from:Account}).then((result) => {
      
        console.log(result);
        // console.log(result.dna);
      
    }); 

  };
  return (
    
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
    
  );
};
export default User;