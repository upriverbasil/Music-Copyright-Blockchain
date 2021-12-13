import React, { useState } from "react";
import CardItem from "./CardItem";

import AppBar from "@mui/material/AppBar";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import User from "./User";
import MusicianInfo from "./MusicianInfo";
// import Musician from './Musician';
import MusicianLogin from "./MusicianLogin";
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://iiitd.ac.in/">
        IIIT-D
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Album() {
  const [option, setOption] = useState(0);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <LibraryMusicOutlinedIcon sx={{ mr: 2 }} />
            <Typography variant="h6" color="inherit" noWrap>
              Music Copyright Protection
            </Typography>
          </Toolbar>
        </AppBar>
        {option === 0 && (
          <main>
            <Box
              sx={{
                bgcolor: "background.paper",
                pt: 8,
                pb: 0,
              }}
            >
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  Login
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  Please select your role and proceed to login.
                </Typography>
              </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
              <Grid
                container
                spacing={4}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item align="center">
                  <div
                    onClick={() => {
                      setOption(1);
                    }}
                  >
                    <CardItem
                      link=""
                      altText="Musician Picture"
                      imgLink="https://images.unsplash.com/photo-1471478331149-c72f17e33c73?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80"
                      title="Music Artist"
                      content="A music artist is a person of a group of person who compose, sing the songs and produce them to be available to customers."
                    />
                  </div>
                </Grid>

                <Grid item align="center">
                  <div
                    onClick={() => {
                      setOption(2);
                    }}
                  >
                    <CardItem
                      link=""
                      altText="User Picture"
                      imgLink="https://images.unsplash.com/photo-1506157786151-b8491531f063?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                      title="User"
                      content="A user is a person who purchases and listens to the soundtracks released by music artists using this decentralized app."
                    />
                  </div>
                </Grid>

                <Grid item align="center">
                  <div
                    onClick={() => {
                      setOption(3);
                    }}
                  >
                    <CardItem
                      link=""
                      altText="Musician Info"
                      imgLink="https://pubs.asha.org/cms/asset/0c2b8671-b9b3-4bd9-8c6e-3a73ff7d694f/aja-18-0125donofrio_featimage.jpg"
                      title="Music Info"
                      content="Get the Information details about the Musician you want to search for..."
                    />
                  </div>
                </Grid>
              </Grid>
            </Container>
          </main>
        )}
        {option === 1 && <MusicianLogin />}
        {option === 2 && <User />}
        {option === 3 && <MusicianInfo />}
      </ThemeProvider>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Music Copyright Protection
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Project for the course Introduction to Blockchain and Cryptocurrency,
          Monsoon 2021
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </div>
  );
}
