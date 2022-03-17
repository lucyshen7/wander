import React, { useState } from "react";
import TextField from "@mui/material/TextField";

interface Props {
  addActivity: AddActivity;
  tripId: number;
}

const defaultValues = {
  // an obj initialized with properties for each form value
  tripId: 0,
  date: "",
  activityName: "",
  activityAddress: "",
  type: "",
  cost: 0,
};

export const AddActivityForm: React.FC<Props> = ({ addActivity, tripId }) => {
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <div className="todo-form">
      {/* Change to date selection */}
      <TextField
        id="date-input"
        name="date"
        label="Date"
        type="text"
        value={formValues.date}
        onChange={handleInputChange}
      />
      <TextField
        id="activityName-input"
        name="activityName"
        label="Activity Name"
        type="text"
        value={formValues.activityName}
        onChange={handleInputChange}
      />
      <TextField
        id="activityAddress-input"
        name="activityAddress"
        label="Activity Address"
        type="text"
        value={formValues.activityAddress}
        onChange={handleInputChange}
      />
      {/* Add dropdown for type of activity */}
      <TextField
        id="cost-input"
        name="cost"
        label="Cost"
        type="number"
        value={formValues.cost}
        onChange={handleInputChange}
      />
    </div>
  );
};
