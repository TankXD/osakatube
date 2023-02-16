const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteCommentBtn = document.querySelectorAll(".video__comment-deleteBtn");

const videoId = videoContainer.dataset.id;

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = id;
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const deleteBtn = document.createElement("span");
  deleteBtn.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(deleteBtn);
  videoComments.prepend(newComment);
  // appendChild() -> 엘레먼트를 순서대로 추가함, 즉 새로운 것은 뒤에 달린
  // prepend() -> 엘레먼트를 역순서대로 추가함, 새로운 것은 앞에 달림.

  deleteBtn.addEventListener("click", handleDeleteComment);
};

const handleDeleteComment = async (event) => {
  const comment = event.currentTarget.parentElement;
  const commentId = comment.dataset.id;
  // console.log(commentId);
  await fetch(`/api/videos/${videoId}/deleteComment`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentId }),
  });
  comment.remove();
};

const handleSubmit = async (event) => {
  event.preventDefault();
  //preventDafault(); ->기본적으로 태그마다 기본 이벤트가 있는데 기본 이벤트 실행을 막는 함수이다
  //form을 submit하거나 a태그를 누르면 기본이벤트가 href링크로 넘어감 or 링크로 새로고침되는 것이 기본이벤트인데 해당 이벤트가 발생하지 않게됨.
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  // const videoId = videoContainer.dataset.id;
  if (text.trim() === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // server에서 express.json()함수를 통해 백엔드에서 text를 object로 변환시켜주지만,
    // 백엔드에서 처음 받는 text가 원래 json text라는 것을 알려줘야하는데 그러려면 Content-Type을 설정해줘야함.
    body: JSON.stringify({ text }),
    // JSON.stringify -> 오브젝트를 text로 변환시켜주는 함수
  });

  if (response.status === 201) {
    textarea.value = "";
    const json = await response.json();
    const newCommentId = json.newCommentId;
    addComment(text, newCommentId);
  }
};

// if처리를 해주는 것은 댓글form이 로그인했을경우에만 존재하기때문에
// 로그아웃했을 때 video를 보면 존재하지 않는 form으로 이벤트함수를 썼기에
//관리자창에 오류가 발생하는데, 그것을 막기위해 if를 사용
if (form) {
  form.addEventListener("submit", handleSubmit);
}
// button.addEventListener("click",handleSubmit);으로 하지 않은 이유
// 어차피 버튼을 클릭하면 폼이 서브밋되기 때문에 그냥 폼을 submit하는것을 감지.
if (deleteCommentBtn) {
  for (let i = 0; i < deleteCommentBtn.length; i++) {
    deleteCommentBtn[i].addEventListener("click", handleDeleteComment);
  }
}
