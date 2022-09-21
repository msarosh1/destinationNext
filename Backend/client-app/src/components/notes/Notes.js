import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import NearMeIcon from "@mui/icons-material/NearMe";

import Note from "./Note";

const Main = styled("main")(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: 50,
  marginRight: 50,
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const useStyles = makeStyles(() => ({
  wrapper: {
    padding: "40px 400 100px 400",
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "left",
    marginTop: 50,

    // border: "1px solid black",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 45,
    width: "50%",
    padding: "3px 20px",
    borderRadius: 30,
    border: "1.75px solid black",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    border: "2px solid black",
    margin: "20px 10px",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 0,
    marginTop: 0,
  },
  logout: {
    fontWeight: "800",
    color: "white",
    border: "1px solid white",
    "&:hover": {
      color: "#00489E",
      backgroundColor: "#fff",
    },
  },
}));

function Notes() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MuiAppBar position="fixed">
        <Toolbar
          style={{
            backgroundColor: "#00489E",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            style={{
              fontWeight: 500,
              color: "white",
              border: "0px solid white",
            }}
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              navigate("/home");
            }}
          >
            Back
          </Button>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <NearMeIcon style={{ marginTop: 4, marginRight: 3 }} />
            <Typography variant="h6" noWrap component="div">
              Destination Next
            </Typography>
          </div>

          <Button
            variant="outlined"
            className={classes.logout}
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              navigate("/");
              toast.warning("Logged out successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </MuiAppBar>

      <Main>
        <DrawerHeader />
        <h2 style={{ color: "#00489E" }}>Your Notes</h2>
        <div className="notes">
          <Note />
        </div>
      </Main>
    </Box>
  );
}

export default Notes;
