import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const defaultValues = {
  title:"",
  album:"",
  publishingyear:"",
  artist:"",
  fileupload:null
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
            label="Artist/Song Writer/Composition Owner"
            type="text"
            value={formValues.artist}
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