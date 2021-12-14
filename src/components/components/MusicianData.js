import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import Web3 from "web3";
import Musicians from "../../abis/Musicians.json";
import { Button, Typography } from "@mui/material";

function User(props) {

  return (
    <div>
      <Typography
            sx={{ mt: 8 }}
            variant="h3"
            component="h1"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Musician public key for identification:
          </Typography>
          <Typography
            sx={{ mt: 5 }}
            variant="h4"
            component="h1"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Title: {props.title}
          </Typography>
          <Typography
            sx={{ mt: 2 }}
            variant="h4"
            component="h1"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Album: {props.album}
          </Typography>
          <Typography
            sx={{ mt: 2 }}
            variant="h4"
            component="h1"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Publishing Year: {props.publishingyear}
          </Typography>
          <Typography
            sx={{ mt: 2 }}
            variant="h4"
            component="h1"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Artist: {props.artist}
          </Typography>
    </div>
  );
}
export default User;