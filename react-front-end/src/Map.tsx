import React, { useEffect, useState } from "react";
import "./App.scss";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

import Geocode from "react-geocode";
const mapAPIkey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
Geocode.setApiKey(`${mapAPIkey}`);

interface Props {
  cityName: Trip["city"];
  activities: Activity[];
  hotelName: Trip["hotel_name"];
}

export const Map: React.FC<Props> = ({ cityName, activities, hotelName }) => {
  const [city, setCity] = useState({ lat: 0, lng: 0 });
  const [hotel, setHotel] = useState({ lat: 0, lng: 0 });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY as any,
  });

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
    const showHotel = async (location: string) => {
      setHotel({
        lat: await getLat(location),
        lng: await getLng(location),
      });
    };
    hotelName && showHotel(hotelName);

    const showCity = async (location: string) => {
      setCity({
        lat: await getLat(location),
        lng: await getLng(location),
      });
    };
    showCity(cityName);
  }, [activities, hotelName, cityName]);

  const containerStyle = {
    width: "100%",
    height: "100%",
  };
  const center = {
    lat: city.lat,
    lng: city.lng,
  };

  if (loadError) return <>'Error loading maps'</>;
  if (!isLoaded) return <>'Loading maps'</>;

  return (
    <div id="map">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {activities && activities.map((activity) => (
          <Marker
            key={activity.activity_id}
            position={{ lat: activity.lat, lng: activity.lng }}
          ></Marker>
        ))}
        <Marker position={{ lat: hotel.lat, lng: hotel.lng }}></Marker>
      </GoogleMap>
    </div>
  );
};
