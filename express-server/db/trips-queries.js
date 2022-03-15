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

module.exports = {
  updateTrip,
  getTrips,
  addTrip
};