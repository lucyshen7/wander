import { Button } from "@mui/material";
import React from "react";
import "./App.scss";
import { ViewTripItem } from "./ViewTripItem";

interface Props {
  trip: Trip["id"];
  closeView: CloseView;
  activities: Activity[];
}

export const ViewTrip: React.FC<Props> = ({ trip, closeView, activities }) => {
  return (
    <div className="view-trip">
      <div className="close">
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            closeView();
          }}
        >
          Close
        </Button>
      </div>
      <div>{activities[0].city} Trip Itinerary:</div>

      {activities.map((activity) => (
        <ViewTripItem activity={activity} />
      ))}
      
    </div>
  );
};
