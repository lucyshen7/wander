import { useEffect, useState } from "react";
import { TripList } from "./TripList";
import { Navbar } from "./Navbar";
import { Container } from "@mui/material";
import axios from "axios";
import "./App.scss";
import { ViewTrip } from "./ViewTrip";
import { AddTripForm } from "./AddTripForm";
import { AddDestForm } from "./AddDestForm";

const initialTrips: Trip[] = [];

const fakeUser = { name: "Alice" }; // to be replaced

function App() {
  const [trips, setTrips] = useState(initialTrips);
  const [visible, setVisible] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(0);
  const [activities, setActivities] = useState([] as any);
  const [dest, setDest] = useState([] as any);

  useEffect(() => {
    // fetch trips
    axios
      .get("http://localhost:8080/api/trips")
      .then((response) => {
        const trips = response.data.trips;
        setTrips(trips);
      })
      .catch((err) => console.log("err fetching data!!!!", err.message));

    // fetch destinations
    axios
      .get("http://localhost:8080/api/trips/dest")
      .then((res) => {
        const destinations = res.data.dest;
        setDest(destinations);
      })
      .catch((err) => console.log("err fetching data!!!!", err.message));
  }, []);

  const viewTrip = (id: Trip["trip_id"]) => {
    axios
      .post("http://localhost:8080/api/trips/activities", { tripId: id })
      .then((response) => {
        const activities = response.data.activities;
        setActivities(activities);
        setSelectedTrip(id);
        setVisible(true);
      })
      .catch((err) => console.log("err fetching data!!!!", err.message));
  };

  const closeView = () => {
    setVisible(false);
  };

  const getTrips = () => {
    axios
      .get("http://localhost:8080/api/trips")
      .then((response) => {
        const trips = response.data.trips;
        setTrips(trips);
      })
      .catch((err) => console.log("err fetching trips data!!!!", err.message));
  };

  const addTrip = (
    destinationId: number,
    hotelName: string,
    hotelAddress: string,
    startDate: string,
    endDate: string,
    hotelCost: number,
    flightCost: number
  ) => {
    axios
      .post("http://localhost:8080/api/trips/add", {
        destinationId: destinationId,
        hotelName: hotelName,
        hotelAddress: hotelAddress,
        startDate: startDate,
        endDate: endDate,
        hotelCost: hotelCost,
        flightCost: flightCost,
      })
      .then((res) => {
        const newTrip = res.data.trips[0];
        return newTrip;
      })
      .then((newTrip) => {
        setTrips([...trips, newTrip]);
        getTrips();
      });
  };

  const addDest = (
    city: string,
    province: string,
    country: string,
    photo: string
  ) => {
    axios
      .post("http://localhost:8080/api/trips/add/dest", {
        city: city,
        province: province,
        country: country,
        photo: photo,
      })
      .then((res) => {
        const newDest = res.data.dest[0];
        console.log("added! dest", dest);
        return newDest;
      })
      .then((newDest) => {
        setDest([...dest, newDest]);
      });
  };

  const addActivity = (
    tripId: number,
    date: string,
    activityName: string,
    activityAddress: string,
    type: string,
    cost: number
  ) => {
    axios
      .post("http://localhost:8080/api/trips/activities/add", {
        tripId: tripId,
        date: date,
        activityName: activityName,
        activityAddress: activityAddress,
        type: type,
        cost: cost,
      })
      .then((res) => {
        const newActivity = res.data.activities[0];
        return newActivity;
      })
      .then((newActivity) => {
        setActivities([...activities, newActivity]);
      });
  };

  const deleteActivity = (activityId: number) => {
    axios
      .post("http://localhost:8080/api/trips/activities/delete", {
        activityId: activityId,
      })
      .then((res) => {
        const deletedId = res.data.activities[0].activity_id;
        return deletedId;
      })
      .then((deletedId) => {
        const findId = (element: any) => element.activity_id === deletedId;
        const index = activities.findIndex(findId);
        const newArray = [...activities];
        newArray.splice(index, 1);
        setActivities(newArray);
      });
  };

  return (
    <>
      <Navbar user={fakeUser} />
      <Container className="main-container">
        <div className="todo-box">
          <h1 className="title">Upcoming Trips</h1>
          <TripList trips={trips} viewTrip={viewTrip} visible={visible} />
          <AddTripForm addTrip={addTrip} destinations={dest} />
        </div>
        {visible && (
          <ViewTrip
            trip={selectedTrip}
            closeView={closeView}
            activities={activities}
            addActivity={addActivity}
            deleteActivity={deleteActivity}
            trips={trips}
          />
        )}
        <AddDestForm addDest={addDest} />
      </Container>
    </>
  );
}

export default App;
