import React, { useState,useEffect} from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { create } from 'ipfs-http-client'
import Input from '@mui/material/Input';
import Web3 from 'web3'
import Musicians from '../../abis/Musicians.json'
import Box from '@mui/material/Box';
const defaultValues = {
  title:"",
  album:"",
  publishingyear:"",
  artist:"",
  wallet:"",
  payment:"",
  ipfsHash:""
};





const client = create('https://ipfs.infura.io:5001/api/v0')

const User = (props) => {



  const[token,setToken] = useState()

  useEffect(() => {
    (async () => {
      await loadWeb3()
      await loadBlockchainData()
    })()
  }, []);

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
  const [albumpub,setAlbumPub] = useState(false)
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    console.log(formValues)
    const { name, value } = e.target;
    
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = async(event) => {
    console.log(formValues);
    // event.preventDefault();
    console.log(formValues);
    var list1 = [formValues.wallet]
    var list2 = [formValues.payment]
    await token.methods.addAlbum(props.value,formValues.ipfsHash,formValues.title,formValues.album,formValues.publishingyear,formValues.wallet, formValues.payment).send({from:Account})
    setAlbumPub(true)
  };
  const onChange = async(e)=> {
      const file = e.target.files[0]
      try {
        client.add(file).then((added)=>{
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        let x = added.path
        setFormValues({
          ...formValues,
          "ipfsHash": x,
        });
        alert("IPFS HASH:"+x);
        });
        // console.log(formValues,added.path,fileUrl)
      } catch (error) {
        console.log('Error uploading file: ', error)
      }  
    }
  return (
    <div>
    
      <Grid container alignItems="center" justify="center" direction="column" spacing={2}>
        <Grid item xs={1}>
          <TextField
          	required={true}
            id="title-input"
            name="title"
            label="Title"
            type="text"
            value={formValues.title}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={1}>
          <TextField
          	required={true}
            id="album-input"
            name="album"
            label="Album Name"
            type="text"
            value={formValues.album}
            onChange={handleInputChange}
          />
        </Grid>
         <Grid item xs={1}>
          <TextField
          	required={true}
            id="publishing-input"
            name="publishingyear"
            label="Publishing Year"
            type="integer"
            value={formValues.publishingyear}
            onChange={handleInputChange}
          />
        </Grid>
         <Grid item xs={1}>
          <TextField
          	required={true}
            id="artist-input"
            name="artist"
            label="Artist/Song Writer"
            type="text"
            value={formValues.artist}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={1}>
          <TextField
          	required={true}
            id="wallet-address"
            name="wallet"
            label="Wallet Address"
            type="text"
            value={formValues.wallet}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={1}>
          <TextField
          	required={true}
            id="payment"
            name="payment"
            label="Payment"
            type="text"
            value={formValues.payment}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid>

          <Input
            type="file"
            onChange={onChange}
          />
          
        </Grid>
        <Button variant="contained" color="primary" type="submit" onClick ={handleSubmit} >
          Submit
        </Button>
      </Grid>
    
    
   

    
      {!albumpub && <Box component="div" sx={{ display: 'inline' }}>kaam hogya</Box> }
     </div>
  );
};
export default User;