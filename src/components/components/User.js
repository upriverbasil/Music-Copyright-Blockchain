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
const [num_musician,setNumMusician] = useState()
  const [Account,SetAccount] = useState()
  async function loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    // this.setState({ account: accounts[0] })
    SetAccount(accounts[0])
    const networkId = await web3.eth.net.getId()
    const daiTokenData = Musicians.networks[networkId]
    console.log(daiTokenData)
    if(daiTokenData) {
      const daiToken = new web3.eth.Contract(Musicians.abi, daiTokenData.address)
      console.log(daiToken)
      setToken(daiToken)
      let num_musician = await daiToken.methods.num_musicians().call()
      setNumMusician(num_musician)
      // this.setState({ daiToken })
      // let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call()
      // this.setState({ daiTokenBalance: daiTokenBalance.toString() })
    } else {
      window.alert('DaiToken contract not deployed to detected network.')
    }

    // Load DaiToken
    // const daiTokenData = DaiToken.networks[networkId]
    // if(daiTokenData) {
    //   const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
    //   this.setState({ daiToken })
    //   let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call()
    //   this.setState({ daiTokenBalance: daiTokenBalance.toString() })
    // } else {
    //   window.alert('DaiToken contract not deployed to detected network.')
    // }

    // // Load DappToken
    // const dappTokenData = DappToken.networks[networkId]
    // if(dappTokenData) {
    //   const dappToken = new web3.eth.Contract(DappToken.abi, dappTokenData.address)
    //   this.setState({ dappToken })
    //   let dappTokenBalance = await dappToken.methods.balanceOf(this.state.account).call()
    //   this.setState({ dappTokenBalance: dappTokenBalance.toString() })
    // } else {
    //   window.alert('DappToken contract not deployed to detected network.')
    // }

    // // Load TokenFarm
    // const tokenFarmData = TokenFarm.networks[networkId]
    // if(tokenFarmData) {
    //   const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
    //   this.setState({ tokenFarm })
    //   let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call()
    //   this.setState({ stakingBalance: stakingBalance.toString() })
    // } else {
    //   window.alert('TokenFarm contract not deployed to detected network.')
    // }

    // this.setState({ loading: false })
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
  const handleSubmit = async(event) => {
    console.log(num_musician)
    event.preventDefault();
    console.log(formValues,"ppp");
    await token.methods.getAlbum(formValues.pubaddr,formValues.ipfsHash).call()
    
  };
  return (
    <form onSubmit={handleSubmit}>
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
         <Grid item xs={1}>
          <TextField
          	required={true}
            id="payment-input"
            name="payment"
            label="Payment Amount"
            type="text"
            value={formValues.payment}
            onChange={handleInputChange}
          />
        </Grid>
        <Button variant="contained" color="primary" type="submit" >
          Submit
        </Button>
      </Grid>
    </form>
  );
};
export default User;