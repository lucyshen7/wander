import React, { useState, useEffect } from "react";
import "./App.scss";
import { ViewTripItem } from "./ViewTripItem";
import { TotalCost } from "./TotalCost";

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
import Alert from "@mui/material/Alert";
import axios from "axios";

import { Map } from "./Map";

interface Props {
  trip: Trip["trip_id"];
  closeView: CloseView;
  activities: Activity[];
  addActivity: AddActivity;
  deleteActivity: DeleteActivity;
  trips: Trip[];
}

const APIkey = process.env.REACT_APP_API_KEY;

export const ViewTrip: React.FC<Props> = ({
  trip,
  closeView,
  activities,
  addActivity,
  deleteActivity,
  trips,
}) => {
  const [open, setOpen] = React.useState(false);
  const [weather, setWeather] = React.useState({
    temp: 0,
    feelsLike: 0,
    desc: "",
  });

  const defaultValues = {
    // an obj initialized with properties for each form value
    tripId: trip,
    date: "",
    activityName: "",
    activityAddress: "",
    type: "",
    cost: 0,
  };

  const getTripById = (trips: Trip[], id: Trip["trip_id"]) => {
    const tripObj = trips.find((trip) => trip.trip_id === id);
    return tripObj;
  };
  const tripObj = getTripById(trips, trip);

  const city = tripObj?.city;
  const country = tripObj?.country;

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${APIkey}`
      )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        const temp = Math.round(data.main.temp - 273.15);
        const feelsLike = Math.round(data.main.feels_like - 273.15);
        const desc = data.weather[0].description;
        setWeather({
          temp: temp,
          feelsLike: feelsLike,
          desc: desc,
        });
      })
      .catch((err) => {
        console.log("err fetching weather", err.message);
      });
  }, [city, country]);

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
        {tripObj && tripObj.city} Trip Details:
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
      <div className="trip-info">
        <span>
          Hotel: {tripObj && tripObj.hotel_name},{" "}
          {tripObj && tripObj.hotel_address}
        </span>
        <Map />
      </div>

      <div className="weather">
        <span>Current Weather</span>
        <span>Temp: {weather.temp} °C</span>
        <span>Feels Like: {weather.feelsLike} °C</span>
        <span>Desc: {weather.desc}</span>
      </div>

      <div className="activities-container">
        Itinerary
        {activities.length === 0 ? (
          <div className="alert-msg">
            <Alert severity="info" sx={{ fontFamily: "Comfortaa" }}>
              You have no activities! Add an activity below.
            </Alert>
          </div>
        ) : (
          ""
        )}
        {activities.map((activity) => (
          <ViewTripItem
            key={activity.activity_id}
            activity={activity}
            deleteActivity={deleteActivity}
          />
        ))}
      </div>

      <div className="total-cost">
        <TotalCost activities={activities} />
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
                <InputLabel htmlFor="outlined-adornment-cost">Cost</InputLabel>
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
