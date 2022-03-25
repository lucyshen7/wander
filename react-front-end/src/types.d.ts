// Type Declaration File (global to the project)

interface Trip {
  trip_id: number;
  destination_id: number;
  hotel_name: text;
  hotel_address: text;
  city: text;
  province: text;
  country: text;
  start_date: date;
  end_date: date;
  photo: text;
  hotel_cost: number;
  flight_cost: number;
  province: text;
}

interface Activity {
  activity_id: number;
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

type ViewTrip = (selectedTrip: Trip["trip_id"]) => void;

type CloseView = () => void;

// Declare the type AddActivity
type AddActivity = (tripId: number, date: string, activityName: string, activityAddress: string, type: string, cost: number) => void;

type AddTrip = (destinationId: number, hotelName: string, hotelAddress: string, startDate: string, endDate: string, hotelCost: number, flightCost: number) => void;

type AddDest = (city: string, province: string, country: string, photo: string) => void;

type DeleteActivity = (activityId: number) => void;
