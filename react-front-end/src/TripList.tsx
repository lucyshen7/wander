import React from "react";
import { TripListItem } from "./TripListItem";
import List from "@mui/material/List";

interface Props {
  trips: Trip[];
}

export const TodoList: React.FC<Props> = ({ trips }) => {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
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
        <TripListItem key={trip.id} hotel={trip.hotel_name} 
        />
      ))}
    </List>
  );
};
