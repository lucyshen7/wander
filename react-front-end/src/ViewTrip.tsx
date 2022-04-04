import React, { useState, useEffect } from "react";
import "./App.scss";
import { ViewTripItem } from "./ViewTripItem";
import { TotalCost } from "./TotalCost";
import { Map } from "./Map";
import Geocode from "react-geocode";

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
  Card,
  CardContent,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HotelIcon from "@mui/icons-material/Hotel";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
// import AirIcon from "@mui/icons-material/Air";
import axios from "axios";

interface Props {
  trip: Trip["trip_id"];
  closeView: CloseView;
  activities: Activity[];
  addActivity: AddActivity;
  deleteActivity: DeleteActivity;
  trips: Trip[];
  setActivities: Function;
}

const weatherAPIkey = process.env.REACT_APP_WEATHER_API_KEY;
const mapAPIkey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
const geoAPIkey = process.env.REACT_APP_GEOCODE_API_KEY;

Geocode.setApiKey(`${mapAPIkey}`);

const convertDecimal = (num: number) => {
  return (num / 100).toFixed(2);
};

const types = [
  "Entertainment",
  "Food",
  "Museum",
  "Park",
  "Transportation",
  "Worship",
  "Other",
];

export const ViewTrip: React.FC<Props> = ({
  trip,
  closeView,
  activities,
  addActivity,
  deleteActivity,
  trips,
  setActivities,
}) => {
  const [open, setOpen] = React.useState(false);
  const [weather, setWeather] = React.useState({
    temp: 0,
    feelsLike: 0,
    desc: "",
    high: 0,
    low: 0,
  });

  const [forecast, setForecast] = useState([] as any); // saves an array of objects for 7 day forecast

  const [zone, setZone] = useState("");
  const [cityId, setCityId] = useState(0);
  const [coords, setCoords] = useState({
    lat: 0,
    lng: 0,
  });

  const getLat = async (address: string) => {
    try {
      const response = await Geocode.fromAddress(address);
      const { lat } = response.results[0].geometry.location;
      return lat;
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const getLng = async (address: string) => {
    try {
      const response = await Geocode.fromAddress(address);
      const { lng } = response.results[0].geometry.location;
      return lng;
    } catch (err: any) {
      console.log(err.message);
    }
  };

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
  const hotel = tripObj?.hotel_name;

  useEffect(() => {
    axios // get daily weather forecast
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${weatherAPIkey}`
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
          high: Math.round(data.main.temp_max - 273.15),
          low: Math.round(data.main.temp_min - 273.15),
        });
      })
      .then(() => {
        const time = new Date();
        const timestamp = Number(time) / 1000;

        const getGeocode = async (address: string) => {
          setCoords({
            ...coords,
            lat: await getLat(city),
            lng: await getLng(city),
          });
        };
        city && getGeocode(city);
        city &&
          axios
            .get(
              `https://en.wikipedia.org/w/api.php?action=query&prop=pageprops&format=json&titles=${city}`
            )
            .then((res) => {
              const pageNum = Object.keys(res.data.query.pages).map(
                (key) => res.data.query.pages[key]
              );
              const pageId = pageNum[0].pageid;
              const cityId =
                res.data.query.pages[pageId].pageprops.wikibase_item;
              setCityId(cityId);
              return cityId;
            });

        axios
          .get(
            `
        https://maps.googleapis.com/maps/api/timezone/json?location=${coords.lat}%2C${coords.lng}&timestamp=${timestamp}&key=${mapAPIkey}
        `
          )
          .then((res) => {
            const zone = res.data.timeZoneName;
            setZone(zone);
          });
      })
      .catch((err) => {
        console.log("err fetching weather", err.message);
      });
    // fetch forecast for location
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lng}&appid=${weatherAPIkey}`
      )
      .then((res) => {
        const result = res.data;
        return result;
      })
      .then((data) => {
        const weatherArr = [] as any;
        data.daily.map(
          (x: {
            dt: number;
            temp: { day: number };
            weather: [{ main: string }];
          }) => {
            const date = new Date(x.dt * 1000);
            const formatted =
              date.getFullYear() +
              "-" +
              (date.getMonth() + 1) +
              "-" +
              date.getDate();
            const temp = Math.round(x.temp.day - 273.15);
            weatherArr.push({
              date: formatted,
              temp: temp,
              weather: x.weather[0].main,
            });
            setForecast(weatherArr);
          }
        );
      })
      .catch((err) => {
        console.log("err fetching weather", err.message);
      });
  }, [city, country, coords.lat, coords.lng]);

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

  let total = 0;
  activities.forEach((a) => {
    total += a.cost;
  });

  return (
    <Card sx={{ overflow: "overlay" }} className="view-trip" id="view-trip">
      <div className="trip-header">
        {tripObj && tripObj.city} Trip Details:
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            closeView();
          }}
          className="danger-btn-grad"
        >
          Close
        </Button>
      </div>

      <div className="info-box">
        <Card sx={{ width: "50%" }} id="info-card">
          <CardContent id="hotel-flight-details">
            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
              <div className="info-title">
                <HotelIcon />
                Hotel Info
              </div>
              <div className="info-items">
                <span>Name: {tripObj && tripObj.hotel_name} </span>
                <span>Address: {tripObj && tripObj.hotel_address} </span>
                <div className="info-title">
                  <MonetizationOnIcon />
                  Expenses
                </div>
                <div className="info-items">
                  <span>
                    Hotel Cost: ${tripObj && convertDecimal(tripObj.hotel_cost)}{" "}
                    CAD
                  </span>
                  <span>
                    Flight Cost: $
                    {tripObj && convertDecimal(tripObj.flight_cost)} CAD
                  </span>
                  <span>Activities Cost: ${total / 100} CAD</span>
                  <span className="purple">
                    Total Trip Cost: $
                    {tripObj &&
                      (tripObj.flight_cost + tripObj.hotel_cost + total) /
                        100}{" "}
                    CAD
                  </span>
                </div>
              </div>
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ width: "25%" }} id="info-card">
          <CardContent>
            {" "}
            <div className="info-title">
              <LocationCityIcon />
              City Facts
            </div>
            <div className="info-items">
              <span>City: {city}</span>
              <span>Region: {tripObj && tripObj.province}</span>
              <span>Country: {country}</span>
              <span className="purple">Timezone: {zone && zone}</span>
            </div>
          </CardContent>
        </Card>

        <Card sx={{ width: "25%" }} id="info-card">
          <CardContent>
            <div className="info-title">
              <WbSunnyIcon />
              Current Weather
            </div>
            <div className="info-items">
              <span>Actual: {weather.temp} °C</span>
              <span>Feels Like: {weather.feelsLike} °C</span>
              <span>Low: {weather.low} °C</span>
              <span>High: {weather.high} °C</span>
              <span className="purple">{weather.desc}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Map cityName={city} activities={activities} hotelName={hotel} />
      </div>

      <div className="activities-container">
        My Activities:
        {activities.length === 0 ? (
          <div className="alert-msg">
            <Alert severity="info">
              You have no activities! Add an activity below.
            </Alert>
          </div>
        ) : (
          ""
        )}
        <div className="activity-items-container">
          {activities.map((activity) => (
            <ViewTripItem
              key={activity.activity_id}
              activity={activity}
              deleteActivity={deleteActivity}
              coords={coords}
              forecast={forecast}
            />
          ))}
        </div>
      </div>

      <div className="total-cost">
        <TotalCost activities={activities} />
      </div>
      <div className="add-activity">
        <div>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            className="btn-grad"
          >
            <AddLocationIcon />
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
                    {types.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
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
    </Card>
  );
};
