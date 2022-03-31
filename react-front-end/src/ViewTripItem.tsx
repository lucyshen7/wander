import React from "react";
import { IconButton, Card } from "@mui/material";
import "./App.scss";
import DeleteIcon from "@mui/icons-material/Delete";
// import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import CloudIcon from "@mui/icons-material/Cloud";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import UmbrellaIcon from "@mui/icons-material/Umbrella";

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
      <div className="activity-item">
        <span className="activity-forecast">
          {(weatherObj && weatherObj.weather) === "Clouds" ? (
            <span>
              <CloudIcon />{" "}
            </span>
          ) : (weatherObj && weatherObj.weather) === "Sun" ? (
            <WbSunnyIcon />
          ) : (weatherObj && weatherObj.weather) === "Clear" ? (
            <WbSunnyIcon />
          ) : (weatherObj && weatherObj.weather) === "Rain" ? (
            <UmbrellaIcon />
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
        </span>
        <span className="activity-date">
          {weekday.slice(0, 3)}, {month.slice(0, 3)} {day}
        </span>
        <span className="activity-name">{activity.activity_name}</span>
        <span className="activity-type">
          <span className="type">{activity.type}</span>
        </span>
        <span>$ {cost} CAD</span>
        <IconButton
          id="delete-btn"
          color="error"
          onClick={() => {
            deleteActivity(activity.activity_id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </Card>
  );
};
