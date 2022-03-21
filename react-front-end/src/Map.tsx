import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React from "react";
import "./App.scss";

export const Map: React.FC = () => {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY as any
  });

  const containerStyle = {
    width: "100%",
    height: "100%",
  };
  const center = {
    lat: 35.6938,
    lng: 139.7034,
  };
  
  if (loadError) return <>'Error loading maps'</>;
  if (!isLoaded) return <>'Loading maps'</>;

  return (
    <div id="map">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={{ lat: 35.6967, lng: 139.7056 }}></Marker> 
        <Marker position={{ lat: 34.9671, lng: 135.7727 }}></Marker> 
      </GoogleMap>
    </div>
  );
};
