import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import "./App.scss";
import Geocode from "react-geocode";

const mapAPIkey = process.env.REACT_APP_MAP_API_KEY;

Geocode.setApiKey(`${mapAPIkey}`);

export const Map: React.FC = () => {
  const [marker, setMarker] = useState({ lat: 0, lng: 0 });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY as any,
  });

  const containerStyle = {
    width: "100%",
    height: "100%",
  };
  const center = {
    lat: 35.6938,
    lng: 139.7034,
  };

  const getLat = async (address: string) => {
    try {
      const response = await Geocode.fromAddress(address);
      const { lat } = response.results[0].geometry.location;
      return lat;
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const getLng = async (address: string) => {
    try {
      const response = await Geocode.fromAddress(address);
      const { lng } = response.results[0].geometry.location;
      return lng;
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const showMarker = async (address: string) => {
      setMarker({
        lat: await getLat(address),
        lng: await getLng(address),
      });
    };
    showMarker("Shibuya Crossing");
  }, []);

  if (loadError) return <>'Error loading maps'</>;
  if (!isLoaded) return <>'Loading maps'</>;

  return (
    <div id="map">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={{ lat: 35.6967, lng: 139.7056 }}></Marker>
        <Marker position={{ lat: 34.9671, lng: 135.7727 }}></Marker>
        {marker && (
          <Marker position={{ lat: marker.lat, lng: marker.lng }}></Marker>
        )}
      </GoogleMap>
    </div>
  );
};
