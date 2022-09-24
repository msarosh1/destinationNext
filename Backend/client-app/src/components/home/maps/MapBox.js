import "mapbox-gl/dist/mapbox-gl.css";
import React, { useState, useRef, useCallback, useEffect } from "react";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { addDestination } from "../../../apis/dataApis";
import { toast } from "react-toastify";

import "./Mapbox.css";

const MAPBOX_TOKEN = process.env.REACT_APP_MAP_TOKEN;

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

const useStyles = makeStyles(() => ({
  wrapper: {
    padding: "30px 0px 35px 0px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100vh",

    // border: "1px solid black",
  },
  mapWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
}));

function MapBox({ selectedAddress }) {
  const classes = useStyles();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  const mapRef = useRef();
  const geocoderContainerRef = useRef();
  const [searchResult, setSearchResult] = useState();
  const [address, setAddress] = useState();
  const [showAddBtn, setShowAddBtn] = useState(false);

  useEffect(() => {
    console.log({ selectedAddress });
  }, [selectedAddress]);

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };
      console.log({ newViewport });

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  const handleOnResult = (event) => {
    setSearchResult(event.result);
    setAddress(event.result.place_name);
  };

  const handleAddDestination = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    console.log(event.currentTarget);

    const addData = {
      address: address,
      description: data.get("description"),
    };
    console.log({ addData });

    const addResponse = addDestination(addData);

    if (addResponse) {
      toast.success("Your destination has been added!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      toast.error("Something went wrong. Could not add.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  useEffect(() => {
    console.log({ searchResult });
    if (searchResult) {
      setShowAddBtn(true);
    }
  }, [searchResult, address]);
  return (
    <>
      <div className={classes.wrapper}>
        <div
          ref={geocoderContainerRef}
          className=".mapboxgl-ctrl-geocoder--input"
        />
        <div>
          {showAddBtn && (
            <Button
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              style={{ backgroundColor: "#00489E" }}
              onClick={() => setModalIsOpen(true)}
            >
              Add Destination
            </Button>
          )}
        </div>
      </div>
      <div
        style={{
          height: "calc(100vh - 290px)",
          // width: "100vh",
        }}
      >
        <MapGL
          ref={mapRef}
          {...viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          <Geocoder
            mapRef={mapRef}
            containerRef={geocoderContainerRef}
            onResult={handleOnResult}
            placeholder="Search Destination"
            onViewportChange={handleGeocoderViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            className="mapboxgl-ctrl-geocoder"
          />
        </MapGL>
      </div>
      <Modal
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ padding: 3 }}
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: 15 }}
          >
            Add Destination
          </Typography>

          <Box
            component="form"
            className={classes.modalFields}
            noValidate
            onSubmit={handleAddDestination}
          >
            <TextField
              fullWidth
              variant="outlined"
              disabled
              value={address ? address : null}
              id="address"
              label="Address"
              name="address"
              style={{ padding: "5px 0px 15px" }}
              autoComplete="family-name"
            />
            <TextField
              fullWidth
              variant="outlined"
              multiline
              maxRows={4}
              id="description"
              label="Description"
              name="description"
              autoFocus
              autoComplete="family-name"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                type="submit"
                sx={{ mt: 3, mb: 2 }}
                style={{
                  fontWeight: 500,
                }}
              >
                Add
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default MapBox;
