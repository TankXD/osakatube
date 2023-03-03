const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteCommentBtn = document.querySelectorAll(".video__comment-deleteBtn");

const videoId = videoContainer.dataset.id;
const isFlyIo = process.env.NODE_ENV === "production";

const addComment = (comment) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = comment._id;

  const commentAdded = document.createElement("div");
  commentAdded.className = "video__comment-added";
  const commentAddedAvatar = document.createElement("div");
  commentAddedAvatar.className = "video__comment-added__avatar";
  const ownerLink = document.createElement("a");
  ownerLink.href = `/users/${comment.owner._id}`;
  if (!comment.owner.avatarUrl) {
    const avatarEmpty = document.createElement("div");
    avatarEmpty.className = "video__comment-avatar__empty avatar-s";
    const EmptyIcon = document.createElement("i");
    EmptyIcon.className = "fas fa-user";
    avatarEmpty.appendChild(EmptyIcon);
    ownerLink.appendChild(avatarEmpty);
  } else {
    const avatar = document.createElement("img");
    avatar.className = "video__comment-avatar";
    if (isFlyIo) {
      avatar.src = comment.owner.avatarUrl;
      avatar.crossOrigin = "crossorigin";
    } else {
      avatar.src = "/" + comment.owner.avatarUrl;
    }
    ownerLink.appendChild(avatar);
  }
  const commentInfo = document.createElement("div");
  commentInfo.className = "video__comment-added__info";
  const commentInfoMain = document.createElement("div");
  commentInfoMain.className = "video-comment-added__info-main";
  const commentUsername = document.createElement("h4");
  commentUsername.innerText = `${comment.owner.username} `;
  const commentDate = document.createElement("span");
  commentDate.innerText = new Date(comment.createdAt).toLocaleDateString(
    "canada"
  );
  const commentText = document.createElement("span");
  commentText.innerText = `${comment.text}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "video__comment-deleteBtn";
  const deleteSpan = document.createElement("span");
  deleteSpan.innerText = "❌";

  commentAddedAvatar.appendChild(ownerLink);
  commentInfo.appendChild(commentInfoMain);
  commentInfo.appendChild(commentText);
  commentInfoMain.appendChild(commentUsername);
  commentInfoMain.appendChild(commentDate);
  deleteBtn.appendChild(deleteSpan);
  commentAdded.appendChild(commentAddedAvatar);
  commentAdded.appendChild(commentInfo);

  newComment.appendChild(commentAdded);
  newComment.appendChild(deleteBtn);

  videoComments.prepend(newComment);
  // appendChild() -> 엘레먼트를 순서대로 추가함, 즉 새로운 것은 뒤에 달린
  // prepend() -> 엘레먼트를 역순서대로 추가함, 새로운 것은 앞에 달림.

  deleteBtn.addEventListener("click", handleDeleteComment);
};

const handleDeleteComment = async (event) => {
  event.preventDefault();
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
    const { commentInfoJSON } = await response.json();
    const commentInfo = JSON.parse(commentInfoJSON);
    addComment(commentInfo);
    // const newCommentId = json.newCommentId;
    // addComment(text, newCommentId);
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
