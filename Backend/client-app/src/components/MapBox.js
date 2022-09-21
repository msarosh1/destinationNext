import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function MapBox() {
  const [viewport, setViewPort] = useState({
    latitude: 45.50884,
    longitude: -73.58781,
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });
  return (
    <ReactMapGL
      {...viewport}
      mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
      onViewportChange={(viewport) => {
        setViewPort(viewport);
      }}
    >
      markers here
    </ReactMapGL>
  );
}

export default MapBox;
