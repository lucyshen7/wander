import React from "react";
import { TripListItem } from "./TripListItem";
import List from "@mui/material/List";

interface Props {
  trips: Trip[];
  viewTrip: ViewTrip;
  visible: boolean;
}

export const TripList: React.FC<Props> = ({ trips, viewTrip, visible }) => {
  return (
    <List className="trip-list-box">
      {trips.map((trip) => (
        <TripListItem
          key={trip.trip_id}
          id={trip.trip_id}
          city={trip.city}
          province={trip.province}
          country={trip.country}
          start_date={trip.start_date}
          end_date={trip.end_date}
          photo={trip.photo}
          viewTrip={viewTrip}
          visible={visible}
        />
      ))}
    </List>
  );
};
