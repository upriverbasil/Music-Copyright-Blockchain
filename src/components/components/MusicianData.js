import React from "react";
import { Typography } from "@mui/material";
import { Card, CardActionArea, CardMedia, CardContent } from "@mui/material";
import { grid } from "@mui/system";
import MusicianImage from "../../images/musician_image.jpg"

function User(props) {
  let image = MusicianImage;

  return (
    <div>
      <Card sx={{ maxWidth: 300 }}>
        <CardMedia
          component="img"
          height="225"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography sx={{ mb: 0 }} align="center" gutterBottom variant="h5">
            {props.title}
          </Typography>
          <Typography align="center" variant="body2" color="text.secondary">
            Artist's Public Key: {props.pubkey}
          </Typography>
          <Typography align="center" variant="body2" color="text.secondary">
            {props.album}
          </Typography>
          <Typography align="center" variant="body2" color="text.secondary">
            {props.publishingyear}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
export default User;
