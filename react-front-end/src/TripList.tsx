import React from "react";
import { TripListItem } from "./TripListItem";
import List from "@mui/material/List";

interface Props {
  trips: Trip[];
}

export const TripList: React.FC<Props> = ({ trips }) => {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 700,
        height: "50",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        rowGap: "5px",
        maxHeight: "60vh",
        overflow: "auto",
      }}
    >
      {trips.map((trip) => (
        <TripListItem
          key={trip.id}
          city={trip.city}
          province={trip.province}
          country={trip.country}
          start_date={trip.start_date}
          end_date={trip.end_date}
        />
      ))}
    </List>
  );
};
