import User from "../models/user";
// user모델을 가져와야함.
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const { name, email, username, password, password2, location } = req.body;
  const pageTitle = "Join";
  if (password !== password2) {
    return res.status(400).render("join", {
      // status(400)을 보내주는 이유는 status(400)을 보내지 않은 경우 웹사이트의 경우 이 작업이 오류가 났는지 모른다.
      // 그러면 비밀번호를 저장할까요?라거나 오류가 뜬 페이지도 브라우저는 정상적으로 200status(정상) 신호를 받고
      // 접속기록을 남긴다. 이 작업이 없다고해서 큰 문제가 생기진 않지만, 가급적 해주는 것이 좋다.
      pageTitle,
      errorMessage: "Password confirmation does not match",
    });
  }
  const usernameExists = await User.exists({ username: username });
  // model.find({})와 달리 model.exists({})의 경우 존재유무만 반환해줌
  // 물론 find를 해도 if를 사용하는데에는 문제 없음
  if (usernameExists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This username is already taken",
    });
  }
  const emailExists = await User.exists({ email: email });
  if (emailExists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This email is already taken",
    });
  }
  try {
    await User.create({
      name,
      email,
      username,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    // console.log(error);
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "An account with this username does not exists",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    res
      .status(400)
      .render("login", { pageTitle: "Login", errorMessage: "Wrong password" });
  }
  console.log("Log user in");
  res.end();
};

export const editUser = (req, res) => {
  res.send("edit user");
};

export const deleteUser = (req, res) => {
  res.send("delete user");
};

export const logout = (req, res) => {
  res.send("logout");
};

export const seeUser = (req, res) => {
  res.send("see User");
};
