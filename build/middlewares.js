"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadVideo = exports.uploadAvatar = exports.publicOnlyMiddleware = exports.loggedInUserOnlyMiddleware = exports.localMiddleware = void 0;
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var localMiddleware = function localMiddleware(req, res, next) {
  res.locals.siteName = "Tanktube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  // console.log(res.locals);
  next();
};
//- res.locals 같은 경우 pug와 express가 공유하고있는 전역오브젝트변수이기에
//- 다른 명령어 없이 res.locals에 있는 데이터들은 간단하게 쓸 수 있다.
//- 자바스크립트파일에서 res.locals안에 res.locals.sexy라는 오브젝트를 생성했다면
//-  pug파일에서 loggedInUser으로 바로 사용하거나
//-  #{loggedInUser.username}를 입력해서 바로 사용할 수 있다.
//- 근데 pug파일이 아닌 다른 js파일에서 res.locals안에 오브젝트들을 사용하려면
//- res.locals.loggedInUser을 모두 입력해야함.
exports.localMiddleware = localMiddleware;
var loggedInUserOnlyMiddleware = function loggedInUserOnlyMiddleware(req, res, next) {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Log in first");
    return res.redirect("/login");
  }
};
exports.loggedInUserOnlyMiddleware = loggedInUserOnlyMiddleware;
var publicOnlyMiddleware = function publicOnlyMiddleware(req, res, next) {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "not authorized");
    return res.redirect("/");
  }
};
exports.publicOnlyMiddleware = publicOnlyMiddleware;
var uploadAvatar = (0, _multer["default"])({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 3000000
  }
});
exports.uploadAvatar = uploadAvatar;
var uploadVideo = (0, _multer["default"])({
  dest: "uploads/videos/",
  limits: {
    fileSize: 30000000
  }
});

// dest속성 :  multer를 통해 브라우저에서 file을 받을 때 백엔드의 어떤 경로에 받을 지 정하는 속성
// limits : 각종 제한을 걸 수 있는 속성
// fileSize : 업로드가능한 파일 크기를 제한, 1 = 1byte임
exports.uploadVideo = uploadVideo;