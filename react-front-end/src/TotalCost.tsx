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

  let newTotal = (Number(total) / 100).toFixed(2);

  return (
    <div className="total-cost">
      Total Cost: $ {newTotal} CAD
    </div>
  );
};
