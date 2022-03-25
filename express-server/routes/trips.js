const express = require('express');
const router = express.Router();
const tripQueries = require('../db/trips-queries');

// GET trips
router.get("/", (req, res) => {
  tripQueries.getTrips()
    .then((trips) => {
      console.log('trips', trips);
      res.json({ trips });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// GET destinations
router.get("/dest", (req, res) => {
  tripQueries.getDest()
    .then((dest) => {
      console.log('dest', dest);
      res.json({ dest });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// POST to fetch activities
router.post("/activities", (req, res) => {
  const { tripId } = req.body;

  tripQueries.getActivities(tripId)
    .then((activities) => {
      console.log('activities', activities);
      res.json({ activities });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// POST to add trip
router.post("/add", (req, res) => {
  const { destinationId, hotelName, hotelAddress, startDate, endDate, hotelCost, flightCost } = req.body;

  tripQueries.addTrip(destinationId, hotelName, hotelAddress, startDate, endDate, hotelCost, flightCost)
    .then((trips) => {
      console.log('trips', trips);
      res.json({ trips });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// POST to add destination
router.post("/add/dest", (req, res) => {
  const { city, province, country, photo } = req.body;

  tripQueries.addDest(city, province, country, photo)
    .then((dest) => {
      console.log('dest', dest);
      res.json({ dest });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// POST to add activity
router.post("/activities/add", (req, res) => {
  const { tripId, date, activityName, activityAddress, type, cost } = req.body;

  tripQueries.addActivity(tripId, date, activityName, activityAddress, type, cost)
    .then((activities) => {
      console.log('activities', activities);
      res.json({ activities });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// POST to delete activity
router.post("/activities/delete", (req, res) => {
  const { activityId } = req.body;

  tripQueries.deleteActivity(activityId)
    .then((activities) => {
      console.log('deleted. activities', activities);
      res.json({ activities });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// export router object
module.exports = router;