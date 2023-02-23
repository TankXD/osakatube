"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireWildcard(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _expressFlash = _interopRequireDefault(require("express-flash"));
var _connectMongo = _interopRequireDefault(require("connect-mongo"));
var _rootRouter = _interopRequireDefault(require("./routers/rootRouter"));
var _userRouter = _interopRequireDefault(require("./routers/userRouter"));
var _videoRouter = _interopRequireDefault(require("./routers/videoRouter"));
var _middlewares = require("./middlewares");
var _apiRouter = _interopRequireDefault(require("./routers/apiRouter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// 과거문법
// const express = require("express");
// const app = express();

// 최신문법

// session을 쓰기위해서 express-session을 써야함!

// session을 db에 넣는 작업 하기위해 사용(서버를 재시작해도 세션유지)
// express-session을 임포트한 후에 임포트하기.

var app = (0, _express["default"])();
var logger = (0, _morgan["default"])("dev");
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
// 순서도 중요하다.
app.use(_express["default"].urlencoded({
  extended: true
}));
// express.urlencoded 미들웨어로 웹사이트로 들어오는 form을 서버(백엔드)가 이해하도록 만들어줌

// app.use(express.text());
// -> express.text()미들웨어로 웹사이트에 request(fetch등으로)로 들어오는 text를 서버(백엔드)가 이해하도록 만들어줌
// 다만 text가아닌 object를 보내는 경우 의미가 없음
app.use(_express["default"].json());
// object를 JSON.stringify함수로 text로 변환해서 보낸 경우
// text로 변환된 object를 사용하기 위해서는 express.json()미들웨어가 필요함.

app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  // 쿠키에 sign할때 사용하는 string
  resave: false,
  saveUninitialized: false,
  // resave,saveUninitialized 속성을 false로 하면, 모든 방문자에게 쿠키를 주거나 DB에  session정보를 저장하는 것이 아니라,
  // 백엔드에서 직접적으로 코드를 통해 session오브젝트에 업데이트나 수정이 이뤄졌을 때만
  // DB에 session을 저장하게 된다.
  // 기본적으로 공식사이트에서도 resave와 saveUninitialized는 false가 권장된다.
  cookie: {
    maxAge: 6000000
    // 쿠키의 유지기간을 정하는 속성 (1000이 1초)
    // 10분으로 설정된 상태임.
  },

  store: _connectMongo["default"].create({
    mongoUrl: process.env.MONGO_ATLAS_URL
  })
  // secrit, mongoUrl값은 공개되면 안되기에 environment file(환경변수)를 사용한다.
}));
// 세션 미들웨어부분은 라우터 위에 써줘야한다
// 세션 미들웨어를 통해 서버(백엔드)는 브라우저에 세션ID가 담긴 cookie를 전달해주고
// 브라우저는 백엔드에 request를 할 때마다 request에 cookie를 붙이게된다.
// 해당 쿠키에는 session ID가 있고 이를 통해 브라우저와 백엔드의 연결을 유지해준다.
// 참고로 세션과 쿠키는 별개이다.

app.use(_middlewares.localMiddleware);
app.use((0, _expressFlash["default"])());

// 브라우저(클라이언트)에게 uploads폴더 안을 공개하겠다는 의미.
// "/uplaods"이부분에는 폴더명과 달라도 됨.,그냥 브라우저를 위한 URL일 뿐.
// 즉, uploads폴더의 내용물을 /uploads URL을 통해 공개하라는 것.
// 중요한건 express.static("폴더명")을 입력해야함.
app.use("/uploads", _express["default"]["static"]("uploads"));
app.use("/static", _express["default"]["static"]("assets"));
app.use("/", _rootRouter["default"]);
app.use("/users", _userRouter["default"]);
app.use("/videos", _videoRouter["default"]);
app.use("/api", _apiRouter["default"]);
var _default = app;
exports["default"] = _default;