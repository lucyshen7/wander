// Type Declaration File (global to the project)

interface Trip {
  id: number;
  destination_id: number;
  hotel_name: text;
  city: text;
  province: text;
  country: text;
  start_date: date;
  end_date: date;
  photo: text;
}

interface Activity {
  id: number;
  trip_id: number;
  activity_name: text;
  activity_address: text;
  date: date;
  type: text;
  cost: number;
  city: text;
  country: text;
  hotel_name: text;
  hotel_address: text;
}

interface User {
  name: string;
}

type ViewTrip = (selectedTrip: Trip["id"]) => void;

type CloseView = () => void;

// Declare the type AddTodo: each new todo will start off incomplete, so we just need a text prop to create one.
type AddActivity = (tripId: number, date: string, activityName: string, activityAddress: string, type: string, cost: number) => void;