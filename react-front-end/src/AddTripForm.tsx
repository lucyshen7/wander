import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./App.scss";

import TextField from "@mui/material/TextField";
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

export const AddTripForm: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const defaultValues = {
    destination: 0,
    hotelName: "",
    hotelAddress: "",
    startDate: "",
    endDate: "",
    hotelCost: 0,
    flightCost: 0,
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

  return (
    <div className="add-trip-form">
      <Button variant="contained" onClick={handleClickOpen}>
        Add Trip
      </Button>{" "}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a Trip</DialogTitle>
        <DialogContent className="dialog-fields">
          <DialogContentText>
            Please fill out the following fields.
          </DialogContentText>

          <Box sx={{ minWidth: 120, marginTop: "10px" }}>
            <FormControl fullWidth>
              <InputLabel id="destination-select-label">Destination</InputLabel>
              <Select
                autoFocus
                margin="dense"
                labelId="destination-select-label"
                id="destination-select"
                name="destination"
                value={formValues.destination}
                label="Destination"
                onChange={handleInputChange}
                fullWidth
              >
                <MenuItem value={1}>Miami, Florida</MenuItem>
                <MenuItem value={2}>Shinjuku, Tokyo</MenuItem>
                <MenuItem value={3}>Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TextField
            autoFocus
            margin="dense"
            id="hotelName-input"
            name="hotelName"
            label="Hotel Name"
            type="text"
            fullWidth
            value={formValues.hotelName}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="hotelAddress-input"
            name="hotelAddress"
            label="Hotel Address"
            type="text"
            fullWidth
            value={formValues.hotelAddress}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="startDate-input"
            name="startDate"
            label="Start Date"
            type="date"
            fullWidth
            value={formValues.startDate}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="endDate-input"
            name="endDate"
            label="End Date"
            type="date"
            fullWidth
            value={formValues.endDate}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth sx={{ marginTop: "10px" }}>
            <InputLabel htmlFor="outlined-adornment-cost">
              Flight Cost
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-cost"
              value={formValues.flightCost}
              name="flightCost"
              onChange={handleInputChange}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Flight Cost"
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: "10px" }}>
            <InputLabel htmlFor="outlined-adornment-cost">
              Hotel Cost
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-cost"
              value={formValues.hotelCost}
              name="hotelCost"
              onChange={handleInputChange}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Hotel Cost"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              // addActivity(
              //   formValues.tripId,
              //   formValues.date,
              //   formValues.activityName,
              //   formValues.activityAddress,
              //   formValues.type,
              //   formValues.cost
              // );
              handleClose();
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
