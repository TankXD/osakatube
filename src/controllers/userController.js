import User from "../models/user";
// user모델을 가져와야함.
import fetch from "node-fetch";
import bcrypt from "bcrypt";
import { token } from "morgan";
// 같은 js라고해도 백엔드에서 fetch는 원래 못쓰기때문에 node-fetch를 패키지를 받아야함.
// 주의점은 그냥 npm i node-fetch로 하면 버전3이상이 다운로드 되는데, 3점대는 오류가 발생한다.
// npm install node-fetch@2.6.1 를입력해서 버전2를 받는 것이 좋다.

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
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "An account with this username does not exists",
    });
  }
  if (user.socialOnly === true) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "This ID is for social login only",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res
      .status(400)
      .render("login", { pageTitle: "Login", errorMessage: "Wrong password" });
  }
  console.log("Log user in");
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: "1185270fbeeb24fe4d66",
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  // fetch메소드를 통해서, finalUrl에 POST요청을 보낸다.
  // await fetch을 써서 json파일을 가져오는 방식이 fetch().then보다 가독성이 좋다.
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        // 이 부분을 입력해줘야 text가 아닌 json형식으로 데이터를 반환받을 수 있다.
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com/";
    const userData = await (
      await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();
    // console.log(userData);
    const emailData = await (
      await fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        name: userData.name ? userData.name : "Unknown",
        avatarUrl: userData.avatar_url,
        socialOnly: true,
        username: userData.login,
        email: emailObj.email,
        password: "",
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getEditUser = (req, res) => {
  res.render("edit-profile");
};

export const postEditUser = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { name, username, email, location },
    file,
  } = req;
  console.log(file);
  const findEnteredUsername = await User.findOne({ username });
  if (findEnteredUsername) {
    const usernameExists = findEnteredUsername._id != _id;
    if (usernameExists) {
      return res.status(400).render("edit-profile", {
        errorMessage: "username is already Exists",
      });
    }
  }
  const findEnteredEmail = await User.findOne({ email });
  if (findEnteredEmail) {
    const emailExists = findEnteredEmail._id != _id;
    if (emailExists) {
      return res.status(400).render("edit-profile", {
        errorMessage: "email is already Exists",
      });
    }
  }
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      username,
      email,
      location,
    },
    { new: true }
    // new:true설정을 안해두면 모델.findByIdAndUpdate메소드는 업데이트 되기 전의 정보를 반환해줌.
    // new:true를 설정해두면 업데이트된 후의 데이터를 반환해준다.
  );
  req.session.user = updatedUser;

  return res.redirect("/users/edit");
};

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    return res.redirect("/");
  }
  return res.render("change-password", { pageTitle: "Change Password" });
};
export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPasswordConfirmation },
  } = req;
  const user = await User.findById(_id);
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    return res.status(400).render("change-password", {
      pageTitle: "Change Password",
      errorMessage: "The current password is incoreect",
    });
  }
  if (newPassword !== newPasswordConfirmation) {
    return res.status(400).render("change-password", {
      pageTitle: "Change Password",
      errorMessage: "The password does not match the confirmation",
    });
  }
  user.password = newPassword;
  await user.save();

  req.session.destroy();
  return res.redirect("/login");
};

export const seeUser = (req, res) => {
  res.send("see User");
};
