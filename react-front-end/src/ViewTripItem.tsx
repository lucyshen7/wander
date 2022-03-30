import React from "react";
import { Button, Card } from "@mui/material";
import "./App.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import CloudIcon from "@mui/icons-material/Cloud";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

interface Props {
  activity: Activity;
  deleteActivity: DeleteActivity;
  coords: {
    lat: number;
    lng: number;
  };
  forecast: [
    {
      date: string;
      temp: number;
      weather: string;
    }
  ];
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
  forecast,
}) => {
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
