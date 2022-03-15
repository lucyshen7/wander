// load .env data into process.env
require('dotenv').config({
  path: '../.env'
});

const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;

const cors = require("cors");
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

App.use(cors(corsOptions)); // Use this after the variable declaration

// Express Configuration
App.use(BodyParser.urlencoded({
  extended: false
}));
App.use(BodyParser.json());
App.use(Express.static('public'));

const tripRoutes = require("./routes/trips");
App.use("/api/trips", tripRoutes);

// Single-page application
App.get('/api/todos/test', (req, res) => res.json({
  message: "Seems to work!",
}));

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});