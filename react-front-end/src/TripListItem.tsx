import React from "react";
import ListItem from "@mui/material/ListItem";
import "./App.scss";

interface Props {
  key: Trip["id"];
  city: Trip["city"];
  province: Trip["province"];
  country: Trip["country"];
  start_date: Trip["start_date"];
  end_date: Trip["end_date"];
}

// the TripListItem component will take a triplist item as a prop.

export const TripListItem: React.FC<Props> = ({
  key,
  city,
  province,
  country,
  start_date,
  end_date,
}) => {
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

  const tripStart = new Date(start_date);
  const month1 = months[tripStart.getMonth()];
  const day1 = tripStart.getDate();

  const tripEnd = new Date(end_date);
  const month2 = months[tripEnd.getMonth()];
  const day2 = tripEnd.getDate();

  // Declare TripListItem as a functional component (React.FC) and pass Props as a generic
  return (
    <ListItem sx={{ bgcolor: "#eaeaea" }}>
      <div className="trip-list">
        <span>
          {city}, {province}, {country}
        </span>
        <span>
          {month1}, {day1} to {month2}, {day2}
        </span>
      </div>
    </ListItem>
  );
};
