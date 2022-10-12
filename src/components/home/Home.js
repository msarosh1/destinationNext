import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import NearMeIcon from "@mui/icons-material/NearMe";
import { Grid } from "@mui/material";
import Destinations from "../destinations/Destinations";

import MapBox from "./maps/MapBox";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
  withCredentials: true,
});

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
  // mapWrapper: {
  //   display: "flex",
  //   justifyContent: "center",
  //   flexDirection: "column",
  //   alignItems: "center",
  // },

  heading: {
    color: "#9F9C9B",
    fontSize: 15,
    margin: "8px 0px 12px",
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
  const [selectedDestination, setSelectedDestination] = useState();

  console.log("check home log");

  const handleLogout = async () => {
    localStorage.removeItem("isLoggedin");
    localStorage.removeItem("id");
    localStorage.removeItem("username");

    // const logoutRes = await logout();

    navigate("/");
  };

  // useEffect(() => {
  //   if (
  //     localStorage.getItem("isLoggedin") === "true" ||
  //     localStorage.getItem("isLoggedin") === true
  //   ) {
  //     const checkAuthentication = checkAuth();

  //     if (checkAuthentication) {
  //       console.log("what", localStorage.getItem("username"));
  //     }
  //   }
  // }, []);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isLoggedin");

    console.log({ isAuthenticated });
    if (isAuthenticated === "false" || !isAuthenticated) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        console.log("fetch", localStorage.getItem("username"));
        const response = await api.get(
          `destinations/?username=${localStorage.getItem("username")}`,
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        if (response) {
          console.log({ response });
          setDestinations(response?.data?.destinations);
          return response.data;
        } else {
          return false;
        }
      } catch (error) {
        console.log("error in: getDestinations", { error });
        return false;
      }
    };

    if (
      localStorage.getItem("username")
      // localStorage.getItem("update") ||
      // localStorage.getItem("delete")
    ) {
      fetchDestinations();
    }
  }, []);

  useEffect(() => {
    console.log("");
  }, [destinations]);

  const handleGetAddressCallback = (destination) => {
    console.log("Home -  selected", destination);
    setSelectedDestination(destination);
  };

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
            <p></p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <NearMeIcon
                style={{
                  marginTop: 2,
                  marginRight: 4,
                  height: "30px",
                  width: "30px",
                }}
              />
              <Typography variant="p" noWrap component="div">
                DESTINATION NEXT
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
                handleLogout();
                // navigate("/");
                // toast.warning("Logged out successfully", {
                //   position: toast.POSITION.BOTTOM_RIGHT,
                // });
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
            columns={{ xs: 5, md: 12 }}
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
                    borderBottom: "1px solid #00498E",
                    paddingBottom: 0,
                    marginBottom: 18,
                  }}
                >
                  <h3 style={{ marginBottom: 3 }}>Your list</h3>
                </div>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: 20,
                  }}
                >
                  {" "}
                  <h6 className={classes.heading}>
                    <span style={{ fontSize: 24, color: "#00489E" }}>
                      {destinations ? destinations?.length : 0}&nbsp;
                    </span>
                    destinations found
                  </h6>
                </span>

                <Destinations
                  destinations={destinations}
                  handleGetAddressCallback={handleGetAddressCallback}
                />
              </Grid>
            ) : null}

            <Grid item xs={8} md={8} sx={{ marginTop: 0 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#014493",
                  borderBottom: "1px solid #00498E",
                  marginBottom: 0,
                }}
              >
                <h3 style={{ marginBottom: 3 }}>Pick your destination</h3>
              </div>
              <MapBox selectedDestination={selectedDestination} />
            </Grid>
          </Grid>
        </Main>
      </Box>
    </>
  );
}
