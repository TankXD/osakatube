"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _videoController = require("../controllers/videoController");
var _middlewares = require("../middlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var videoRouter = _express["default"].Router();

// id에 정규식을 걸어주지 않은 경우 /upload 라우터가 맨 위에 와야함.
// -> id에 정규식이 없다면 upload자체도 id로 인식되어
// watchVidoes 함수변수가 실행되기 때문.
videoRouter.get("/:id([0-9a-f]{24})", _videoController.watchVideos);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(_middlewares.loggedInUserOnlyMiddleware).get(_videoController.getEdit).post(_videoController.postEdit);
// videoRouter.get("/:id([0-9a-f]{24})/edit", getEdit);
// videoRouter.post("/:id([0-9a-f]{24})/edit", postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(_middlewares.loggedInUserOnlyMiddleware).get(_videoController.deleteVideos);
videoRouter.route("/upload").all(_middlewares.loggedInUserOnlyMiddleware).get(_videoController.getUpload).post(_middlewares.uploadVideo.fields([{
  name: "video",
  maxCount: 1
}, {
  name: "thumb",
  maxCount: 1
}]), _videoController.postUpload);
var _default = videoRouter;
exports["default"] = _default;