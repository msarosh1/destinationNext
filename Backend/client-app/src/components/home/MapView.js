import React, { PureComponent } from "react";
import ReactMapGL from "react-map-gl";
import Geocoder from "react-mapbox-gl-geocoder";
// import { Container, Col, Row } from "reactstrap";

const mapStyle = {
  width: "100%",
  height: 600,
};

const mapboxApiKey = process.env.REACT_APP_MAP_TOKEN;

const params = {
  country: "ca",
};

class MapView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 45.50884,
        longitude: -73.58781,
        zoom: 15,
      },
    };
  }

  onSelected = (viewport, item) => {
    this.setState({
      viewport,
    });
  };

  render() {
    const { viewport } = this.state;
    return (
      <>
        <h2>Mapbox Tutorial</h2>
        <Geocoder
          mapboxApiAccessToken={mapboxApiKey}
          onSelected={this.onSelected}
          viewport={viewport}
          hideOnSelect={true}
          value=""
          queryParams={params}
        />
        <ReactMapGL
          mapboxApiAccessToken={mapboxApiKey}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          {...viewport}
          {...mapStyle}
          onViewportChange={(viewport) => this.setState({ viewport })}
        ></ReactMapGL>
      </>
    );
  }
}

export default MapView;
