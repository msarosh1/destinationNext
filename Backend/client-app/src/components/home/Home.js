import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import NearMeIcon from "@mui/icons-material/NearMe";
import ReactMapGL from "react-map-gl";

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
    padding: "40px 0 100px 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    wordWrap: "break-word",

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
    border: "1.5px solid black",
  },
  searchInput: {
    display: "flex",
    flex: 1,
    border: "none",
    fontSize: 16,
    background: "none",
    outline: "none",
  },
  logoutBtn: {
    fontWeight: "800",
    color: "white",
    border: "1px solid white",
    "&:hover": {
      color: "#00489E",
      backgroundColor: "#fff",
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [viewport, setViewPort] = useState({
    latitude: 45.50884,
    longitude: -73.58781,
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });

  return (
    <>
      {/* <Box sx={{ display: "flex" }}>
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
                navigate("/notes");
              }}
            >
              Saved
            </Button>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <NearMeIcon style={{ marginTop: 4, marginRight: 3 }} />
              <Typography variant="h6" noWrap component="div">
                Destination Next
              </Typography>
            </div>

            <Button
              variant="contained"
              className={classes.logoutBtn}
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
          <div className={classes.wrapper}>
            <div className={classes.searchContainer}>
              <input
                type="text"
                placeholder="Address"
                className={classes.searchInput}
              ></input>
              <SearchIcon />
            </div>
          </div>
        </Main>
      </Box> */}
      <ReactMapGL
        {...viewport}
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        onViewportChange={(viewport) => {
          setViewPort(viewport);
        }}
      >
        markers here
      </ReactMapGL>
    </>
  );
}
