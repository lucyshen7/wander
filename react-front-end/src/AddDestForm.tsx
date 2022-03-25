import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./App.scss";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  addDest: AddDest;
}

export const AddDestForm: React.FC<Props> = ({ addDest }) => {
  const [open, setOpen] = useState(false);

  const defaultValues = {
    city: "",
    province: "",
    country: "",
    photo: "",
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
    <div className="add-Dest-form">
      <Button variant="contained" onClick={handleClickOpen}>
        Add Destination
      </Button>{" "}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a Destination</DialogTitle>
        <DialogContent className="dialog-fields">
          <DialogContentText sx={{ paddingBottom: "10px" }}>Add destination details below.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="city-input"
            name="city"
            label="City"
            type="text"
            fullWidth
            value={formValues.city}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="province-input"
            name="province"
            label="Province"
            type="text"
            fullWidth
            value={formValues.province}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="country-input"
            name="country"
            label="Country"
            type="text"
            fullWidth
            value={formValues.country}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="photo-input"
            name="photo"
            label="Image URL"
            type="url"
            fullWidth
            value={formValues.photo}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              addDest(
                formValues.city,
                formValues.province,
                formValues.country,
                formValues.photo
              );
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
