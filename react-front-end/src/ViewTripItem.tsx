import React, { useEffect, useState } from "react";
import { Button, Card } from "@mui/material";
import "./App.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import Geocode from "react-geocode";
import axios from "axios";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import CloudIcon from "@mui/icons-material/Cloud";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

const APIkey = process.env.REACT_APP_API_KEY;
const mapAPIkey = process.env.REACT_APP_MAP_API_KEY;

Geocode.setApiKey(`${mapAPIkey}`);

interface Props {
  activity: Activity;
  deleteActivity: DeleteActivity;
}

export const ViewTripItem: React.FC<Props> = ({ activity, deleteActivity }) => {
  const [forecast, setForecast] = useState([] as any);
  const [coords, setCoords] = useState({
    lat: 0,
    lng: 0,
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
    const getGeocode = async (address: string) => {
      setCoords({
        ...coords,
        lat: await getLat(activity.activity_address),
        lng: await getLng(activity.activity_address),
      });
    };
    activity && getGeocode(activity.activity_address);

    axios // fetch weather
      .get(
        `        
        https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lng}&appid=${APIkey}
        `
      )
      .then((res) => {
        console.log("res.data", res.data);
        const result = res.data;
        return result;
      })
      .then((data) => {
        const weatherArr = [] as any;
        data.daily.map(
          (x: {
            dt: number;
            temp: { day: number };
            weather: [{ main: string }];
          }) => {
            const date = new Date(x.dt * 1000);
            const formatted =
              date.getFullYear() +
              "-" +
              (date.getMonth() + 1) +
              "-" +
              date.getDate();
            const temp = Math.round(x.temp.day - 273.15);
            weatherArr.push({
              date: formatted,
              temp: temp,
              weather: x.weather[0].main,
            });
            setForecast(weatherArr);
          }
        );
      })
      .catch((err) => {
        console.log("err fetching weather", err.message);
      });
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = new Date(activity.date);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const weekday = days[date.getDay()];

  const cost = (activity.cost / 100).toFixed(2);

  const activityDate =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + day;
  // console.log("activityDate", activityDate);

  const weatherObj = forecast.find(
    (x: { date: string; temp: number; weather: string }) =>
      x.date === activityDate
  );
  console.log("forecast", forecast);
  console.log("weatherObj", weatherObj);

  return (
    <Card className="activity">
      {(weatherObj && weatherObj.weather) === ("Clouds" || "Rain") ? (
        <CloudIcon />
      ) : (weatherObj && weatherObj.weather) === "Sun" ? (
        <WbSunnyIcon />
      ) : (
        <ThermostatIcon />
      )}
      {weatherObj ? (
        <span>
          {weatherObj.temp} °C, {weatherObj.weather}{" "}
        </span>
      ) : (
        <span>n/a</span>
      )}
      <span>
        {weekday}, {month}, {day}
      </span>
      <span>{activity.activity_name}</span>
      <span>{activity.type}</span>
      <span>$ {cost} CAD</span>
      <Button
        variant="outlined"
        onClick={() => {
          deleteActivity(activity.activity_id);
        }}
      >
        <DeleteIcon color="primary" />
      </Button>
    </Card>
  );
};
