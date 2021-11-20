import React, { useState } from "react";
import Grid from "@mui/material/Grid";
// import CardItem from './CardItem'
import TextField from "@mui/material/TextField";
import Musician from './Musician';
import Button from "@mui/material/Button";
var forge = require('node-forge');
var BigInteger = forge.jsbn.BigInteger;
var THIRTY = new BigInteger(null);
THIRTY.fromInt(30);
var GCD_30_DELTA = [6, 4, 2, 4, 2, 4, 6, 2];
function generateRandom(bits) {
  var rng = {
    // x is an array to fill with bytes
    nextBytes: function(x) {
      var b = forge.random.getBytes(x.length);
      for(var i = 0; i < x.length; ++i) {
        x[i] = b.charCodeAt(i);
      }
    }
  };
  var num = new BigInteger(bits, rng);

  // force MSB set
  var bits1 = bits - 1;
  if(!num.testBit(bits1)) {
    var op_or = function(x,y) {return x|y;};
    num.bitwiseTo(BigInteger.ONE.shiftLeft(bits1), op_or, num);
  }

  // align number on 30k+1 boundary
  num.dAddOffset(31 - num.mod(THIRTY).byteValue(), 0);

  return num;
}
function findPrime(num, callback) {
  /* Note: All primes are of the form 30k+i for i < 30 and gcd(30, i)=1. The
  number we are given is always aligned at 30k + 1. Each time the number is
  determined not to be prime we add to get to the next 'i', eg: if the number
  was at 30k + 1 we add 6. */
  var deltaIdx = 0;

  // find prime nearest to 'num' for 100ms
  var start = Date.now();
  while(Date.now() - start < 100) {
    // do primality test (only 2 iterations assumes at
    // least 1251 bits for num)
    if(num.isProbablePrime(2)) {
      return callback(num);
    }
    // get next potential prime
    num.dAddOffset(GCD_30_DELTA[deltaIdx++ % 8], 0);
  }

  // keep trying (setImmediate would be better here)
  setTimeout(function() {
    findPrime(num, callback);
  });
}
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
        console.log("Inside Generate Public hash");
        // generate random BigInteger
        var num = generateRandom(100);
        //   generate a large prime number
        findPrime(num, function(num) {
          console.log('random', num.toString(16));
        });
        alert(num);
        
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
        <Button variant="contained" color="primary" type="generate" onClick={handleGenerate}>
          Generate
        </Button>
      </Grid>
      {
        option===1 && <Musician/>}
    </form>
    

  );
};
export default User;  