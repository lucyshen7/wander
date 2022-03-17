import React, { useState } from "react";
import "./App.scss";
import { ViewTripItem } from "./ViewTripItem";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  trip: Trip["id"];
  closeView: CloseView;
  activities: Activity[];
  setForm: Function;
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

export const ViewTrip: React.FC<Props> = ({
  trip,
  closeView,
  activities,
  setForm,
}) => {
  const [open, setOpen] = React.useState(false);
  const [formValues, setFormValues] = useState(defaultValues);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

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
        <Button
          variant="contained"
          className="add-activity-btn"
          onClick={() => {
            setForm(true);
          }}
        >
          Add Activity
        </Button>

        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            Open form dialog
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add an Activity</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please fill out the following fields.
              </DialogContentText>
              <TextField
                // autoFocus
                margin="dense"
                id="date-input"
                name="date"
                label="Date"
                type="date"
                fullWidth
                value={formValues.date}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                autoFocus
                margin="dense"
                id="activityName-input"
                name="activityName"
                label="Activity Name"
                type="text"
                fullWidth
                value={formValues.activityName}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                autoFocus
                margin="dense"
                id="activityAddress-input"
                name="activityAddress"
                label="Activity Address"
                type="address"
                fullWidth
                value={formValues.activityAddress}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
              {/* Add dropdown for type of activity */}
              <TextField
                autoFocus
                margin="dense"
                id="cost-input"
                name="cost"
                label="Cost"
                type="number"
                value={formValues.cost}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Add</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
