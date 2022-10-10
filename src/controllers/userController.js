import user from "../models/user";
// user모델을 가져와야함.

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const { name, email, username, password, password2, location } = req.body;
  const pageTitle = "Join";
  if (password !== password2) {
    return res.render("join", {
      pageTitle,
      errorMessage: "Password confirmation does not match",
    });
  }
  const usernameExists = await user.exists({ username: username });
  // model.find({})와 달리 model.exists({})의 경우 존재유무를 반환해주기에 if를 쓰기 용이
  if (usernameExists) {
    return res.render("join", {
      pageTitle,
      errorMessage: "This username is already taken",
    });
  }
  const emailExists = await user.exists({ email: email });
  if (emailExists) {
    return res.render("join", {
      pageTitle,
      errorMessage: "This email is already taken",
    });
  }
  await user.create({
    name,
    email,
    username,
    password,
    location,
  });

  return res.redirect("/login");
};

export const editUser = (req, res) => {
  res.send("edit user");
};

export const deleteUser = (req, res) => {
  res.send("delete user");
};

export const login = (req, res) => {
  res.send("login");
};

export const logout = (req, res) => {
  res.send("logout");
};

export const seeUser = (req, res) => {
  res.send("see User");
};
