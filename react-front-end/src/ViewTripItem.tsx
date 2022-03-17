import { Button } from "@mui/material";
import React from "react";
import "./App.scss";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  activity: Activity;
  deleteActivity: DeleteActivity;
}

export const ViewTripItem: React.FC<Props> = ({ activity, deleteActivity }) => {
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

  return (
    <div className="activity">
      <span>
        {weekday}, {month}, {day}
      </span>
      <span>{activity.activity_name}</span>
      <span>{activity.type}</span>
      <span>$ {cost} CAD</span>
      <Button
        variant="outlined"
        onClick={() => {
          deleteActivity(activity.id);
        }}
      >
        <DeleteIcon color="primary" />
      </Button>
    </div>
  );
};
