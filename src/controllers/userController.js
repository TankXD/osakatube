import user from "../models/user";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const { name, email, username, password, location } = req.body;
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
