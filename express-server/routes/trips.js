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

// POST to fetch activities
router.post("/activities", (req, res) => {
  const { id } = req.body;

  tripQueries.getActivities(id)
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

// POST to todos table
// router.post("/", (req, res) => {
//   const { complete, id } = req.body;

//   todosQueries.updateTodo(complete, id)
//     .then((response) => {
//       res.json({ response });
//     })
//     .catch((err) => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

// ADD todo
// router.post("/add", (req, res) => {
//   const { text } = req.body;

//   todosQueries.addTodo(text)
//     .then((response) => {
//       res.json({ response });
//     })
//     .catch((err) => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

// export router object
module.exports = router;