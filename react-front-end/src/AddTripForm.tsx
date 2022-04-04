import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./App.scss";
import MenuItem from "@mui/material/MenuItem";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import LuggageIcon from "@mui/icons-material/Luggage";

import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Select from "@mui/material/Select";

interface Props {
  addTrip: AddTrip;
  destinations: Destination[];
}

export const AddTripForm: React.FC<Props> = ({ addTrip, destinations }) => {
  const [open, setOpen] = useState(false);

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
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        className="btn-grad"
      >
        <LuggageIcon />
        Add Trip
      </Button>{" "}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a Trip</DialogTitle>
        <DialogContent className="dialog-fields">
          <DialogContentText>Add trip details below.</DialogContentText>
          <Box sx={{ minWidth: 120, marginTop: "20px", marginBottom: "5px" }}>
            <FormControl fullWidth>
              <InputLabel id="destination-select-label" required>
                Destination
              </InputLabel>
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
                required
              >
                {destinations.map(
                  (d: {
                    destination_id: Destination["destination_id"];
                    city: Destination["city"];
                    province: Destination["province"];
                    country: Destination["country"];
                  }) => (
                    <MenuItem key={d.destination_id} value={d.destination_id}>
                      {d.city}, {d.province}, {d.country}
                    </MenuItem>
                  )
                )}
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
            required
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
            required
          />
          <div className="two-fields-form">
            <FormControl className="two-fields">
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
                required
              />
            </FormControl>
            <FormControl className="two-fields">
              <TextField
                className="two-fields"
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
                required
              />
            </FormControl>
          </div>
          <div className="two-fields-form">
            <FormControl className="two-fields" sx={{ marginTop: "10px" }}>
              <InputLabel htmlFor="outlined-adornment-cost" required>
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
                required
              />
            </FormControl>
            <FormControl className="two-fields" sx={{ marginTop: "10px" }}>
              <InputLabel htmlFor="outlined-adornment-cost" required>
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
                required
              />
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              addTrip(
                formValues.destination,
                formValues.hotelName,
                formValues.hotelAddress,
                formValues.startDate,
                formValues.endDate,
                formValues.hotelCost,
                formValues.flightCost
              );
              handleClose();
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
