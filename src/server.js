// 과거문법
// const express = require("express");
// const app = express();

// 최신문법
import express, { response } from "express";
import morgan from "morgan";
import session from "express-session";
// session을 쓰기위해서 express-session을 써야함!
import MongoStore from "connect-mongo";
// session을 db에 넣는 작업 하기위해 사용(서버를 재시작해도 세션유지)
// express-session을 임포트한 후에 임포트하기.
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localMiddleware } from "./middlewares";

const app = express();

const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
// 순서도 중요하다.
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    // 쿠키에 sign할때 사용하는 string
    resave: false,
    saveUninitialized: false,
    // resave,saveUninitialized 속성을 false로 하면, 모든 방문자에게 쿠키를 주거나 DB에  session정보를 저장하는 것이 아니라,
    // 백엔드에서 직접적으로 코드를 통해 session오브젝트에 업데이트나 수정이 이뤄졌을 때만
    // DB에 session을 저장하게 된다.
    // 기본적으로 공식사이트에서도 resave와 saveUninitialized는 false가 권장된다.
    cookie: {
      maxAge: 6000000,
      // 쿠키의 유지기간을 정하는 속성 (1000이 1초)
      // 10분으로 설정된 상태임.
    },
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
    // secrit, mongoUrl값은 공개되면 안되기에 environment file(환경변수)를 사용한다.
  })
);
// 세션 미들웨어부분은 라우터 위에 써줘야한다
// 세션 미들웨어를 통해 서버(백엔드)는 브라우저에 세션ID가 담긴 cookie를 전달해주고
// 브라우저는 백엔드에 request를 할 때마다 request에 cookie를 붙이게된다.
// 해당 쿠키에는 session ID가 있고 이를 통해 브라우저와 백엔드의 연결을 유지해준다.
// 참고로 세션과 쿠키는 별개이다.

app.use(localMiddleware);
// uploads 경로로 브라우저가 get요청을하면 uploads폴더 안을 공개하겠다는 의미.
app.use("/uploads", express.static("uploads"));
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
