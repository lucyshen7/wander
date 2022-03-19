import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./App.scss";

interface Props {
  // addTrip: AddTrip;
  // tripId: number;
}

const defaultValues = {
  // an obj initialized with properties for each form value
  tripId: 0,
  date: "",
  TripName: "",
  TripAddress: "",
  type: "",
  cost: 0,
};

export const AddTripForm: React.FC<Props> = () => {
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <div className="add-trip-form">
      <Button variant="contained" /*onClick={handleClickOpen}*/>
        Add Trip
      </Button>{" "}
    </div>
  );
};
