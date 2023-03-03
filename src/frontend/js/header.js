const btn = document.querySelector(".header__hamburger__menu-btn");
const menuList = document.querySelector(".header__hamburger__menu-list");

btn.addEventListener("click", () => {
  btn.classList.toggle("hamburger__active");
  menuList.classList.toggle("hamburger__hidden");
});
