const db = require('./index');

const getTrips = () => {
  return db.query(`SELECT * FROM trips t JOIN destinations d ON t.destination_id=d.destination_id ORDER BY start_date ASC;`)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log('DB error fetching trips: ' + err.message);
    });
};

const addTrip = (destinationId, hotelName, hotelAddress, startDate, endDate, hotelCost, flightCost) => {
  return db.query(`INSERT INTO trips (destination_id, hotel_name, hotel_address, start_date, end_date, flight_cost, hotel_cost, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`, [destinationId, hotelName, hotelAddress, startDate, endDate, hotelCost, flightCost, new Date()])
    .then((res) => {
      console.log('res.rows', res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log('DB error adding trip: ' + err.message);
    });
};

const getActivities = (id) => {
  return db.query(`SELECT * FROM activities a JOIN trips t ON t.trip_id = a.trip_id JOIN destinations d ON d.destination_id = t.destination_id WHERE a.trip_id = $1 ORDER BY date ASC;`, [id])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log('DB error fetching activities: ' + err.message);
    });
};

const addActivity = (tripId, date, activityName, activityAddress, type, cost) => {
  return db.query(`INSERT INTO activities (trip_id, date, activity_name, activity_address, type, cost) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`, [tripId, date, activityName, activityAddress, type, (cost * 100)])
    .then((res) => {
      console.log('activity post made to db!', res);
      return res.rows;
    })
    .catch((err) => {
      console.log('DB error adding new activity: ' + err.message);
    });
};

const deleteActivity = (activityId) => {
  return db.query(`DELETE FROM activities WHERE activity_id = $1 RETURNING activity_id;`, [activityId])
    .then((res) => {
      console.log('delete post made to db!', res);
      return res.rows;
    })
    .catch((err) => {
      console.log('DB error deleting activity: ' + err.message);
    });
};

module.exports = {
  getTrips,
  addTrip,
  getActivities,
  addActivity,
  deleteActivity,
};