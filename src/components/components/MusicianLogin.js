import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import CardItem from './CardItem'
import TextField from "@mui/material/TextField";
import Musician from './Musician';
import Button from "@mui/material/Button";
const defaultValues = {
    publicValue:"",
};
const User = () => {
    const [formValues, setFormValues] = useState(defaultValues);
    const [option,setOption] = useState(0)
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
    //   redirect to the musician page for entering the details
    };
    const handleGenerate = (event) => {
        event.preventDefault();
        console.log(formValues);
      //   redirect to the musician page for entering the 
    };
return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justify="center" direction="column" spacing={2}>
        <Grid item align = 'left' xs={1} >
          <TextField
          	required={true}
            id="public-value"
            name="publicValue"
            label="Enter Public Key"
            type="text"
            value={formValues.publicValue}
            onChange={handleInputChange}
          />
        </Grid>
        <Button variant="contained" color="primary" type="submit" onClick={ () => {setOption(1)}} >
          Submit
        </Button>
        <Grid>
            <div> 
                <p align = 'center'> OR <br/> </p>
                <p> Create New Public Key</p>
            </div>    
        </Grid>
        <Button variant="contained" color="primary" type="generate" >
          Generate
        </Button>
      </Grid>
      {
        option===1 && <Musician/>}
    </form>
    
  );
};
export default User;  