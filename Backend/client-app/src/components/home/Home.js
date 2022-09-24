import React, { useState, useEffect } from "react";
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
import { Grid } from "@mui/material";
import Destinations from "../destinations/Destinations";

const Main = styled("main")(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: 0,
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
    padding: "40px 0 50px 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    wordWrap: "break-word",
    minWidth: "400px",

    // border: "1px solid black",
  },
  mapWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    color: "#9F9C9B",
    // fontFamily: "Poopins-Bold",
    fontSize: 16,
    borderBottom: "1px solid #9F9C9B",
    width: 200,
    margin: 0,
    marginBottom: 25,
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 45,
    width: "60%",
    padding: "3px 20px",
    borderRadius: 30,
    minWidth: "400px",
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
    border: "0px solid white",
    "&:hover": {
      color: "#00489E",
      backgroundColor: "#fff",
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState();

  const [viewport, setViewPort] = useState({
    latitude: 45.50884,
    longitude: -73.58781,
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });

  useEffect(() => {
    setDestinations([
      {
        id: 1,
        description: "Planning to go there next summer",
        title: "",
        address: "Some location, Washington",
      },
      {
        id: 2,
        description: "Description 2",
        title: "jcndkjv",
        address: "Address 2",
      },
      {
        id: 3,
        description: "Description 2",
        title: "jcndkjv",
        address: "Address 3",
      },
      {
        id: 4,
        description: "Description 1",
        title: "",
        address: "Address 1",
      },
      {
        id: 5,
        description: "Description 2",
        title: "jcndkjv",
        address: "Address 2",
      },
      {
        id: 6,
        description: "Description 2",
        title: "jcndkjv",
        address: "Address 3",
      },
    ]);
  }, []);

  return (
    <>
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
            <div style={{ display: "flex", flexDirection: "row" }}>
              <NearMeIcon
                style={{
                  marginTop: 2,
                  marginRight: 4,
                  height: "30px",
                  width: "30px",
                }}
              />
              <Typography variant="h6" noWrap component="div">
                Destination Next
              </Typography>
            </div>

            <Button
              variant="outlined"
              style={{
                fontWeight: "800",
                color: "white",
                border: "0px solid white",
                "&:hover": {
                  color: "#00489E",
                  backgroundColor: "#fff",
                },
              }}
              className={classes.logoutBtn}
              sx={{ mt: 2, mb: 2 }}
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
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, md: 12 }}
            justifyContent={"center"}
            sx={{
              height: "calc(100vh - 100px)",
              overflowX: "hidden",
            }}
          >
            {destinations ? (
              <Grid item xs={3.5} md={3.5}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#014493",
                  }}
                >
                  <h3>Saved Destinations</h3>
                </div>
                <h6 className={classes.heading}>
                  {destinations ? destinations?.length : 0}&nbsp; Destinations
                  Found
                </h6>

                <Destinations destinations={destinations} />
              </Grid>
            ) : null}

            <Grid item xs={8} md={8}>
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
              <div className={classes.mapWrapper}>Map here</div>
            </Grid>
          </Grid>
        </Main>
      </Box>
    </>
  );
}
