import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import Web3 from "web3";
import Musicians from "../../abis/Musicians.json";
import { Button, Typography } from "@mui/material";

const defaultValues = {
  title: "",
  album: "",
  publishingyear: "",
  artist: "",
  ipfsHash: "",
  publicHash: "111",
};

function User() {
  const [users, setUsers] = useState([]);
  const [singleUser, setSingleUser] = useState([defaultValues]);
  const [token, setToken] = useState();
  const [Account, SetAccount] = useState();
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    (async () => {
      await loadWeb3();
      await loadBlockchainData();
    })();
  }, []);

  async function loadBlockchainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    SetAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();

    const daiTokenData = Musicians.networks[networkId];

    if (daiTokenData) {
      const Token = new web3.eth.Contract(Musicians.abi, daiTokenData.address);
      setToken(Token);
      //console.log(Token);
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

  const onddlChange = (e) => {
    axios
      .get()
      .then((response) => setSingleUser(response.data))
      .then((error) => console.log(error));
  };

  const func = () => {
    token.methods
      .num_musicians()
      .call()
      .then((result) => {
        const n = parseInt(result);
        let result_store = [];
        for (let i = 0; i < n; i++) {
          token.methods
            .all_publickeys(i)
            .call()
            .then((pubHash) => {
              token.methods
                .musicians_allipfs_length(pubHash)
                .call()
                .then((length) => {
                  const size = parseInt(length);
                  for (let j = 0; j < size; j++) {
                    let temp = {
                      title: "",
                      album: "",
                      publishingyear: "",
                      artist: "",
                      ipfsHash: "",
                      publicHash: pubHash,
                    };
                    token.methods
                      .musicians_allipfs(pubHash, j)
                      .call()
                      .then((ipfs) => {
                        temp["ipfsHash"] = ipfs;
                        token.methods
                          .musician(pubHash, ipfs)
                          .call()
                          .then((details) => {
                            temp["title"] = details[0];
                            temp["album"] = details[1];
                            temp["publishingyear"] = parseInt(details[2]);
                          });
                        result_store.push(temp);
                      });
                  }
                });
            });
        }
        setUsers(result_store);
        setDataReady(true);
      });
  };

  return (
    <>
      <Button onClick={func}>Click</Button>
      {dataReady && users.map((user, key) => {
        return (
          <>
            <li>{user}</li>
          </>
        );
      })}
    </>
  );
}
export default User;
