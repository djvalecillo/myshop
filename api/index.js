const express = require("express");
const config = require("../config");
const app = express();
const registerRoutes = require("./routes");
const bodyParser = require("body-parser");
const {
  logErrors,
  wrapErrors,
  errorHandler
} = require("../utils/middlewares/errorHandlers");
const notFoundHandler = require("../utils/middlewares/notFoundHandler");
app.use(bodyParser.json());

//load routes
registerRoutes(app);

app.use(notFoundHandler);

app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`);
});
