import React from "react";
import "./App.scss";

interface Props {
  activity: Activity;
}

export const ViewTripItem: React.FC<Props> = ({ activity }) => {
  return (
    <div className="activity">
      Name: {activity.activity_name}
      Date: {activity.date}
    </div>
  );
};
