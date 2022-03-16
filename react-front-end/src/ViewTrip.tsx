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
      <div className="trip-header">
        {activities[0].city} Trip Itinerary:
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
      <span>
        Hotel: {activities[0].hotel_name}, {activities[0].hotel_address}
      </span>
      <div className="activities-container">
        {activities.map((activity) => (
          <ViewTripItem activity={activity} />
        ))}
      </div>
      <div className="add-activity">
        <Button variant="contained" className="add-activity-btn">
          Add Activity
        </Button>
      </div>
    </div>
  );
};
