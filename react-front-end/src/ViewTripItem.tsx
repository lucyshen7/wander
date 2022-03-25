import React, { useEffect, useState } from "react";
import { Button, Card } from "@mui/material";
import "./App.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import CloudIcon from "@mui/icons-material/Cloud";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

const APIkey = process.env.REACT_APP_API_KEY;

interface Props {
  activity: Activity;
  deleteActivity: DeleteActivity;
  coords: {
    lat: number;
    lng: number;
  };
}

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

export const ViewTripItem: React.FC<Props> = ({
  activity,
  deleteActivity,
  coords,
}) => {
  const [forecast, setForecast] = useState([] as any);

  useEffect(() => {
    axios
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

  const date = new Date(activity.date);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const weekday = days[date.getDay()];

  const cost = (activity.cost / 100).toFixed(2);

  const activityDate =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + day;

  const weatherObj = forecast.find(
    (x: { date: string; temp: number; weather: string }) =>
      x.date === activityDate
  );
  console.log("forecast", forecast); // remove this once fixed
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
