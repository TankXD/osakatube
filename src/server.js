// 과거문법
// const express = require("express");
// const app = express();

// 최신문법

import express, { response } from "express";
import morgan from "morgan";
import session from "express-session";
// session을 쓰기위해서 express-session을 써야함!
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
    secret: "hello",
    resave: true,
    saveUninitialized: true,
  })
);
// 세션 부분은 라우터 위에 써줘야한다!

app.use(localMiddleware);
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
