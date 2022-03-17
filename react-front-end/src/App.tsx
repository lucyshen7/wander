import { useEffect, useState } from "react";
import { TripList } from "./TripList";
import { Navbar } from "./Navbar";
import { Container } from "@mui/material";
import axios from "axios";
import "./App.scss";
import { ViewTrip } from "./ViewTrip";

const initialTrips: Trip[] = [];

const fakeUser = { name: "Alice" }; // to be replaced

function App() {
  const [trips, setTrips] = useState(initialTrips);
  const [visible, setVisible] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(0);
  const [activities, setActivities] = useState([] as any);

  useEffect(() => {
    // fetch trips
    axios
      .get("http://localhost:8080/api/trips")
      .then((response) => {
        const trips = response.data.trips;
        setTrips(trips);
      })
      .catch((err) => console.log("err fetching data!!!!", err.message));
  }, []);

  const viewTrip = (id: Trip["id"]) => {
    axios
      .post("http://localhost:8080/api/trips/activities", { id: id })
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

  return (
    <>
      <Navbar user={fakeUser} />
      <Container className="main-container">
        <div className="todo-box">
          <h1 className="title">Upcoming Trips</h1>
          <TripList trips={trips} viewTrip={viewTrip} visible={visible} />
        </div>
        {visible && (
          <ViewTrip
            trip={selectedTrip}
            closeView={closeView}
            activities={activities}
            addActivity={addActivity}
          />
        )}
      </Container>
    </>
  );
}

export default App;