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
  uploadAvatar,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", loggedInUserOnlyMiddleware, logout);
userRouter
  .route("/edit")
  .all(loggedInUserOnlyMiddleware)
  .get(getEditUser)
  .post(uploadAvatar.single("avatar"), postEditUser);
// uploadAvatar라는 내가 생성한 multer middleware
// single은 파일을 1개씩 받는 경우이며 괄호안의 인자는 pug폼안에서 파일을 보내는 input태그의 name과 동일하게 입력.
// post메소드 안에 사용하며, controller보다 앞에 써줘야지 controller에서 파일을 사용할 수 있다.
userRouter
  .route("/change-password")
  .all(loggedInUserOnlyMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
// /:id로 쓴 Router를 다른 Router들보다 위에 두게되면 모든 경로를 :id로 인식하기때문에 seeUser컨트롤러가 실행될 것,
// 해결되기 위해서는 :id에 경로를 인식하는 조건식을 걸거나, :id라우터를 맨 아래에 둔다.
userRouter.get("/:id", seeUser);

export default userRouter;
