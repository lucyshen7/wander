import React from "react";
import ListItem from "@mui/material/ListItem";
import "./App.scss";
import { Button } from "@mui/material";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";

interface Props {
  id: Trip["trip_id"];
  city: Trip["city"];
  province: Trip["province"];
  country: Trip["country"];
  start_date: Trip["start_date"];
  end_date: Trip["end_date"];
  photo: Trip["photo"];
  viewTrip: ViewTrip;
  visible: boolean;
}

// the TripListItem component will take a triplist item as a prop.

export const TripListItem: React.FC<Props> = ({
  id,
  city,
  province,
  country,
  start_date,
  end_date,
  photo,
  viewTrip,
  visible,
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
    <ListItem
      className="trip-list-item"
      sx={{ borderRadius: 1 }}
    >
      <div className="trip-list">
        <img src={photo} alt="trip_photo" className="trip-photo" />
        <span>
          {city}, {province}, {country}
        </span>
        <span>
          {month1}, {day1} - {month2}, {day2}
        </span>
        <Button
          variant="contained"
          onClick={() => {
            viewTrip(id);
          }}
          disabled={visible}
        >
          View
          <SavedSearchIcon />
        </Button>
      </div>
    </ListItem>
  );
};
