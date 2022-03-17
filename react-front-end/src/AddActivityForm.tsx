import React, { useState } from "react";
// import Grid from "@material-ui/core/Grid";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import Radio from "@material-ui/core/Radio";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
// import Slider from "@material-ui/core/Slider";
// import Button from "@material-ui/core/Button";

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
      {/* <form className="add-todo">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          style={{ height: "30px", width: "240px" }}
        />
        <Button
          variant="contained"
          type="submit"
          onClick={(e) => {
            e.preventDefault(); // cancel the default event of actually submitting the form
            addTodo(text);
            setText("");
          }}
        >
          Add Todo
        </Button>
      </form> */}

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
