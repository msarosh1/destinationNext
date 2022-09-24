import React, { useState } from "react";

import ReactMapGL, { Marker } from "react-map-gl";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function MapBox() {
  const [viewport, setViewport] = useState({
    latitude: 45.50884,
    longitude: -73.58781,
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });

  console.log(process.env.REACT_APP_MAP_TOKEN);
  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
        onViewportChange={(viewport) => setViewport(viewport)}
        // mapStyle
      >
        markers here{" "}
      </ReactMapGL>
      {/* <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      /> */}
    </div>

    // <Map
    //   // style="mapbox://styles/mapbox/streets-v9"
    //   containerStyle={{
    //     height: "100vh",
    //     width: "100vw",
    //   }}
    // >
    //   <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
    //     <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
    //   </Layer>
    // </Map>
  );
}

export default MapBox;
