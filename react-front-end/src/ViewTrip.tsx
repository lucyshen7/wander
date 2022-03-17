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

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Select from "@mui/material/Select";

interface Props {
  trip: Trip["id"];
  closeView: CloseView;
  activities: Activity[];
  addActivity: AddActivity;
}

export const ViewTrip: React.FC<Props> = ({
  trip,
  closeView,
  activities,
  addActivity,
}) => {
  const [open, setOpen] = React.useState(false);
  // const [type, setType] = React.useState("");

  const defaultValues = {
    // an obj initialized with properties for each form value
    tripId: trip,
    date: "",
    activityName: "",
    activityAddress: "",
    type: "",
    cost: 0.00,
  };

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

  // const handleChange = (event: SelectChangeEvent) => {
  //   setType(event.target.value as string);
  // };

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
          <ViewTripItem key={activity.id} activity={activity} />
        ))}
      </div>
      <div className="add-activity">
        <div>
          <Button variant="contained" onClick={handleClickOpen}>
            Add Activity
          </Button>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add an Activity</DialogTitle>
            <DialogContent className="dialog-fields">
              <DialogContentText>
                Please fill out the following fields.
              </DialogContentText>
              <TextField
                autoFocus
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
              <Box sx={{ minWidth: 120, marginTop: "10px" }}>
                <FormControl fullWidth>
                  <InputLabel id="type-select-label">Activity Type</InputLabel>
                  <Select
                    autoFocus
                    margin="dense"
                    labelId="type-select-label"
                    id="type-select"
                    name="type"
                    value={formValues.type}
                    label="Activity Type"
                    onChange={handleInputChange}
                    fullWidth
                  >
                    <MenuItem value={"Food"}>Food</MenuItem>
                    <MenuItem value={"Museum"}>Museum</MenuItem>
                    <MenuItem value={"Park"}>Park</MenuItem>
                    <MenuItem value={"Transportation"}>Transportation</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <FormControl fullWidth sx={{ marginTop: "10px" }}>
                <InputLabel htmlFor="outlined-adornment-cost">
                  Cost
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-cost"
                  value={formValues.cost}
                  name="cost"
                  onChange={handleInputChange}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Cost"
                />
              </FormControl>
              
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={() => {
                  addActivity(
                    formValues.tripId,
                    formValues.date,
                    formValues.activityName,
                    formValues.activityAddress,
                    formValues.type,
                    formValues.cost
                  );
                  handleClose();
                }}
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
