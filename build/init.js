"use strict";

require("dotenv/config");
require("./db");
require("./models/video");
require("./models/user");
require("./models/comment");
var _server = _interopRequireDefault(require("./server"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PORT = 4000;
// const PORT = 8080;
// const PORT = process.env.PORT || 4000;

var handleListening = function handleListening() {
  return console.log("Server listening on port http://localhost:".concat(PORT));
};
_server["default"].listen(PORT, "0.0.0.0");
// app.listen(PORT, handleListening);