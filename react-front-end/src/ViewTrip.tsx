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
import axios from "axios";

interface Props {
  trip: Trip["trip_id"];
  closeView: CloseView;
  activities: Activity[];
  addActivity: AddActivity;
  deleteActivity: DeleteActivity;
  trips: Trip[];
}

const APIkey = process.env.REACT_APP_API_KEY;
const GEOkey = process.env.REACT_APP_GEO_KEY;

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
    high: 0,
    low: 0,
  });

  const [forecast, setForecast] = useState([] as any); // saves an array of objects for 7 day forecast

  const [zone, setZone] = useState("");
  const [pop, setPop] = useState(0);
  const [facts, setFacts] = useState({
    flag: "",
    capital: "",
    currency: "",
    callingCode: "",
  });
  const [currentTime, setCurrentTime] = useState("");
  const [cityId, setCityId] = useState(0);
  const [coords, setCoords] = useState({
    lat: 0,
    lng: 0,
  });

  const mapAPIkey = process.env.REACT_APP_MAP_API_KEY;
  Geocode.setApiKey(`${mapAPIkey}`);

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
            })
            .then((cityId) => {
              const options: object = {
                method: "GET",
                url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${cityId}`,
                headers: {
                  "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
                  "X-RapidAPI-Key": `${GEOkey}`,
                },
              };
              axios
                .request(options)
                .then((res) => {
                  const pop = res.data.data.population.toLocaleString();
                  setPop(pop);
                })
                .catch((err) => {
                  console.error(err);
                });
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

    // get current time
    const options: object = {
      method: "GET",
      url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${cityId}/time`,
      headers: {
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        "X-RapidAPI-Key": `${GEOkey}`,
      },
    };

    axios
      .request(options)
      .then((res) => {
        const time = res.data.data.slice(0, 8);
        setCurrentTime(time);
      })
      .catch((err) => {
        console.error(err);
      });

    // get currency using country id
    axios
      .get(
        `https://en.wikipedia.org/w/api.php?action=query&prop=pageprops&format=json&titles=${country}`
      )
      .then((res) => {
        const pageNum = Object.keys(res.data.query.pages).map(
          (key) => res.data.query.pages[key]
        );
        const pageId = pageNum[0].pageid;
        const countryId = res.data.query.pages[pageId].pageprops.wikibase_item;
        return countryId;
      })
      .then((countryId) => {
        const currOptions: object = {
          method: "GET",
          url: `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${countryId}`,
          headers: {
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
            "X-RapidAPI-Key": `${GEOkey}`,
          },
        };
        axios
          .request(currOptions)
          .then((res) => {
            console.log("res.data", res.data);
            const cap = res.data.data.capital;
            const curr = res.data.data.currencyCodes[0];
            const flag = res.data.data.flagImageUri;
            const code = res.data.data.callingCode;
            setFacts({
              ...facts,
              capital: cap,
              currency: curr,
              callingCode: code,
              flag: flag,
            });
          })
          .catch((err) => {
            console.error(err);
          });
      });

    // fetch forecast for location
    axios
      .get(
        `        
        https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lng}&appid=${APIkey}
        `
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
    <Card
      sx={{ overflow: "overlay", bgcolor: "rgba(234, 234, 234, 0.726)" }}
      className="view-trip"
    >
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

      <div className="info-box">
        <Card
          variant="outlined"
          sx={{ width: "45%", maxHeight: "200px", overflow: "overlay" }}
        >
          <CardContent id="hotel-flight-details">
            <Typography
              className="flex-col"
              sx={{ fontSize: 14 }}
              color="text.primary"
              gutterBottom
            >
              <span>
                <b>Trip Summary</b>
              </span>
              <span>Hotel Name: {tripObj && tripObj.hotel_name}</span>
              <span>Hotel Address: {tripObj && tripObj.hotel_address} </span>
              <span>
                Hotel Cost: ${tripObj && tripObj.hotel_cost / 100} CAD
              </span>
              <span>
                Flight Cost: ${tripObj && tripObj.flight_cost / 100} CAD
              </span>
              <span>Activities Cost: ${total / 100} CAD</span>
              <span>
                <b>
                  Total Trip Cost: $
                  {tripObj &&
                    (tripObj.flight_cost + tripObj.hotel_cost + total) /
                      100}{" "}
                  CAD
                </b>
              </span>
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ width: "30%" }}>
          <CardContent>
            <Typography
              className="flex-col"
              sx={{ fontSize: 14 }}
              color="text.primary"
              gutterBottom
            >
              <b>City Facts</b>
              <span>
                {city}, {tripObj && tripObj.province}, {country}
              </span>
              {pop > 0 && <span>Population: {pop}</span>}
              <span>Timezone: {zone && zone}</span>
              {currentTime && <span>Current Time: {currentTime}</span>}
              {facts.currency && <span>Currency: {facts.currency}</span>}
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ display: "flex", width: "25%" }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
              <b>Current Weather</b>
            </Typography>
            <Typography
              className="flex-col"
              sx={{ fontSize: 14 }}
              color="text.primary"
              gutterBottom
            >
              <span>Actual: {weather.temp} °C</span>
              <span>Feels Like: {weather.feelsLike} °C</span>
              <span>Low: {weather.low} °C</span>
              <span>High: {weather.high} °C</span>
              <span>{weather.desc}</span>
            </Typography>
          </CardContent>
        </Card>
      </div>

      <div className="trip-info">
        <Map cityName={city} activities={activities} hotelName={hotel} />
      </div>

      <div className="activities-container">
        My Activities:
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
            coords={coords}
            forecast={forecast}
          />
        ))}
      </div>

      <div className="total-cost">
        <TotalCost activities={activities} />
      </div>
      <div className="add-activity">
        <div>
          <Button variant="contained" onClick={handleClickOpen}>
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
                    <MenuItem value={"Food"}>Food</MenuItem>
                    <MenuItem value={"Museum"}>Museum</MenuItem>
                    <MenuItem value={"Park"}>Park</MenuItem>
                    <MenuItem value={"Transportation"}>Entertainment</MenuItem>
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
    </Card>
  );
};
