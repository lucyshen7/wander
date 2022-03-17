import React from "react";
import "./App.scss";

interface Props {
  activities: Activity[];
}

export const TotalCost: React.FC<Props> = ({ activities }) => {

  let total = 0;
  activities.forEach((a) => {
    total += a.cost;
  });

  return (
    <div className="total-cost">
      Total Cost: $ {total / 100} CAD
    </div>
  );
};
