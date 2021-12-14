import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { create } from "ipfs-http-client";
import Input from "@mui/material/Input";
import Web3 from "web3";
import Musicians from "../../abis/Musicians.json";
import Box from "@mui/material/Box";

import { Icon, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const defaultValues = {
  title: "",
  album: "",
  publishingyear: "",
  artist: "",
  ipfsHash: "",
  coverImage: ""
};

const client = create("https://ipfs.infura.io:5001/api/v0");

const Musician = (props) => {
  const [readytosubmit, setReadyToSubmit] = useState(false);
  const [token, setToken] = useState();
  const [payees, setPayees] = useState([{ wallet: "", payment: "" }]);

  useEffect(() => {
    (async () => {
      await loadWeb3();
      await loadBlockchainData();
    })();
  }, []);

  const [Account, SetAccount] = useState();
  async function loadBlockchainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    SetAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();

    const daiTokenData = Musicians.networks[networkId];

    if (daiTokenData) {
      const daiToken = new web3.eth.Contract(
        Musicians.abi,
        daiTokenData.address
      );
      setToken(daiToken);
    } else {
      window.alert("DaiToken contract not deployed to detected network.");
    }
  }

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }
  const [albumpub, setAlbumPub] = useState(false);
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleInputChangePayees = (index, event) => {
    const values = [...payees];
    values[index][event.target.name] = event.target.value;
    setPayees(values);
  };

  const handleSubmit = async (event) => {
    let walletsList = [];
    payees.map((value) => {
      walletsList.push(value.wallet);
    });

    let paymentsList = [];
    payees.map((value) => {
      paymentsList.push(parseInt(value.payment));
    });

    await token.methods
      .addAlbum(
        props.value,
        formValues.ipfsHash,
        formValues.title,
        formValues.album,
        formValues.publishingyear,
        walletsList,
        paymentsList
      )
      .send({ from: Account });
    setAlbumPub(true);
  };

  const onChange = async (e) => {
    const file = e.target.files[0];
    try {
      client.add(file).then((added) => {
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;
        let x = added.path;
        setFormValues({
          ...formValues,
          ipfsHash: x,
        });
        setReadyToSubmit(true);
        alert("IPFS HASH:" + x);
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const handleAddFields = () => {
    setPayees([...payees, { wallet: "", payment: "" }]);
    console.log(payees);
  };

  const handleRemoveFields = (index) => {
    const values = [...payees];
    values.splice(index, 1);
    setPayees(values);
  };

  return (
    <div>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={3}
        style={{ padding: 20 }}
      >
        <h1>Music Details</h1>
        <Grid item xs="auto">
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
        <Grid item xs="auto">
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
        <Grid item xs="auto">
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
        <Grid item xs="auto">
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
      </Grid>

      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={3}
        style={{ padding: 1 }}
      >
        <h1> Payments Details</h1>
      </Grid>

      {payees.map((payee, index) => (
        <div key={index}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={3}
            style={{ padding: 5 }}
          >
            <Grid item xs="auto">
              Payee #{index + 1}
            </Grid>
            <Grid item xs="auto">
              <TextField
                required={true}
                name="wallet"
                label="Wallet Address"
                value={payees.wallet}
                onChange={(event) => handleInputChangePayees(index, event)}
              />
            </Grid>
            <Grid item xs="auto">
              <TextField
                required={true}
                name="payment"
                label="Payment Value (ETH)"
                value={payees.payment}
                onChange={(event) => handleInputChangePayees(index, event)}
              />
            </Grid>
            <Grid item xs="auto">
              <IconButton
                disabled={payees.length === 1}
                onClick={handleRemoveFields}
              >
                <RemoveIcon />
              </IconButton>
            </Grid>
            <Grid item xs="auto">
              <IconButton onClick={handleAddFields}>
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      ))}

      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={3}
        style={{ padding: 8 }}
      >
        <h3> Upload File</h3>
      </Grid>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={3}
        style={{ padding: 5 }}
      >
        <Grid>
          <Input type="file" onChange={onChange} />
        </Grid>
        <Button
          disabled={!readytosubmit}
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Grid>
    </div>
  );
};
export default Musician;
