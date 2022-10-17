import express from "express";
import {
  logout,
  seeUser,
  startGithubLogin,
  finishGithubLogin,
  getEditUser,
  postEditUser,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import {
  loggedInUserOnlyMiddleware,
  publicOnlyMiddleware,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", loggedInUserOnlyMiddleware, logout);
userRouter
  .route("/edit")
  .all(loggedInUserOnlyMiddleware)
  .get(getEditUser)
  .post(postEditUser);
userRouter
  .route("/change-password")
  .all(loggedInUserOnlyMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);

userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/:id(\\d+)", seeUser);

export default userRouter;
