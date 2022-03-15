import { Button } from "@mui/material";
import React from "react";
import "./App.scss";

interface Props {
  trip: Trip["id"];
}

export const ViewTrip: React.FC<Props> = ({ trip }) => {
  return (
    <div className="view-trip">
      <div className="close">
        <Button variant="contained" color="error">
          Close
        </Button>
      </div>
      <div>{trip} Trip Events:</div>
    </div>
  );
};
