import express from "express";
import {
  watchVideos,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideos,
} from "../controllers/videoController";
const videoRouter = express.Router();

// id에 정규식을 걸어주지 않은 경우 /upload 라우터가 맨 위에 와야함.
// -> id에 정규식이 없다면 upload자체도 id로 인식되어
// watchVidoes 함수변수가 실행되기 때문.
videoRouter.get("/:id([0-9a-f]{24})", watchVideos);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
// videoRouter.get("/:id([0-9a-f]{24})/edit", getEdit);
// videoRouter.post("/:id([0-9a-f]{24})/edit", postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideos);

videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;
