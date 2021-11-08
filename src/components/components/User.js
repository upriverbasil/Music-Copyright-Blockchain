import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const defaultValues = {
  pubaddr:"",
  ipfs:"",
  payment:"",
  payed:false
};
const User = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {

    const { name, value } = e.target;
    
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
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