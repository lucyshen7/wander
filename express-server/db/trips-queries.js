const db = require('./index');

const getTrips = () => {
  return db.query(`SELECT * FROM trips JOIN destinations ON trips.destination_id=destinations.id ORDER BY start_date ASC;`)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log('DB error fetching trips: ' + err.message);
    });
};

const updateTrip = (complete, id) => {
  return db.query(`UPDATE trips SET complete = $1 WHERE id = $2;`, [complete, id])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log('DB error updating todo: ' + err.message);
    });
};

const addTrip = (text) => {
  return db.query(`INSERT INTO trips (text, complete) VALUES ($1, false) RETURNING *;`, [text])
    .then((res) => {
      console.log('res.rows', res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log('DB error adding todo: ' + err.message);
    });
};

const getActivities = (id) => {
  return db.query(`SELECT * FROM activities a LEFT JOIN trips t ON t.id = a.trip_id LEFT JOIN destinations d ON d.id = t.destination_id WHERE a.trip_id = $1 ORDER BY date ASC;`, [id])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log('DB error fetching activities: ' + err.message);
    });
};

const addActivity = (tripId, date, activityName, activityAddress, type, cost) => {
  return db.query(`INSERT INTO activities (trip_id, date, activity_name, activity_address, type, cost) VALUES (${tripId}, ${date}, $1, $2, ${type}, $3) RETURNING *;`, [activityName, activityAddress, cost])
    .then((res) => {
      console.log('activity post made to db!', res);
      return res.rows;
    })
    .catch((err) => {
      console.log('DB error adding new activity: ' + err.message);
    });
};

module.exports = {
  updateTrip,
  getTrips,
  addTrip,
  getActivities,
  addActivity,
};