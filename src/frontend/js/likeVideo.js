const likeBtn = document.querySelector(".video__data-like__btn");

likeBtn.addEventListener("click", () => {
  likeBtn.classList.toggle("liked");
});
