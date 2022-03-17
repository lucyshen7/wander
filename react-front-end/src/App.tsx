import { useEffect, useState } from "react";
import { TripList } from "./TripList";
import { AddActivityForm } from "./AddActivityForm";
import { Navbar } from "./Navbar";
import { Container } from "@mui/material";
import axios from "axios";
import "./App.scss";
import { ViewTrip } from "./ViewTrip";
// import { TripListItem } from "./TripListItem";

const initialTrips: Trip[] = [];

const fakeUser = { name: "Alice" }; // to be replaced

function App() {
  const [trips, setTrips] = useState(initialTrips);
  const [visible, setVisible] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(0);
  const [activities, setActivities] = useState([]);
  const [form, setForm] = useState(false);

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
        console.log("activities", activities);

        setSelectedTrip(id);
        setVisible(true);
      })
      .catch((err) => console.log("err fetching data!!!!", err.message));
  };

  const closeView = () => {
    setVisible(false);
  };

  // const toggleTodo = (selectedTodo: Todo) => {
  //   axios
  //     .post("http://localhost:8080/api/todos", {
  //       id: selectedTodo.id,
  //       complete: !selectedTodo.complete,
  //     })
  //     .then((res) => {
  //       const newTodos = todos.map((todo) => {
  //         if (todo === selectedTodo) {
  //           return {
  //             ...todo,
  //             complete: !todo.complete,
  //           };
  //         }
  //         return todo;
  //       });
  //       setTodos(newTodos);
  //     });
  // };

  const addActivity: AddActivity = (
    tripId: number,
    date: string,
    activityName: string,
    activityAddress: string,
    type: string,
    cost: number
  ) => {
    axios
      .post("http://localhost:8080/api/trips/add", {
        tripId: tripId,
        date: date,
        activityName: activityName,
        activityAddress: activityAddress,
        type: type,
        cost: cost,
      })
      .then((res) => {
        const newActivity = res.data.response[0];

        console.log({ newActivity });
        // setActivities([...activities, newActivity]);
      });
  };

  return (
    <>
      <Navbar user={fakeUser} />
      <Container className="main-container">
        <div className="todo-box">
          <h1 className="title">Upcoming Trips</h1>
          <TripList trips={trips} viewTrip={viewTrip} />
          {/* <AddTodoForm addTodo={addTodo} /> */}
        </div>
        {visible && (
          <ViewTrip
            trip={selectedTrip}
            closeView={closeView}
            activities={activities}
            setForm={setForm}
          />
        )}
        {form && (
          <AddActivityForm tripId={selectedTrip} addActivity={addActivity} />
        )}
      </Container>
    </>
  );
}

export default App;
