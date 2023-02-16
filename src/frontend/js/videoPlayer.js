const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeoutId = null;
let mouseStopTimeoutId = null;

let volumeValue = volumeRange.value;
video.volume = volumeRange.value;
let videoPauseStatus = true;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMuteClick = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};
const handleVolumeChange = () => {
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = volumeRange.value;
  video.volume = volumeRange.value;
  console.log("레인지 밸류: ", volumeRange.value);
  console.log("실제비디오 볼륨: ", video.volume);
};
const formatTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substring(14, 19);
};

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = (event) => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};
const handleTimeLineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};
const handleTimeLineMouseDown = () => {
  videoPauseStatus = video.paused ? true : false;
  console.log(video.paused);
  video.pause();
};

const handleTimeLineMouseUp = () => {
  if (videoPauseStatus) {
    video.pause();
  } else {
    video.play();
  }
};

const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeoutId) {
    clearTimeout(controlsTimeoutId);
    controlsTimeoutId = null;
  }

  if (mouseStopTimeoutId) {
    clearTimeout(mouseStopTimeoutId);
    mouseStopTimeoutId = null;
  }
  videoControls.classList.add("showing");
  mouseStopTimeoutId = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeoutId = setTimeout(hideControls, 300);
};
const handleKeyDown = (e) => {
  if (e.target === document.body && e.key === " ") {
    handlePlayClick();
  }
  if (e.target === document.body && e.key === "m") {
    handleMuteClick();
  }
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/views`, { method: "POST" });
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("click", handlePlayClick);
video.addEventListener("ended", handleEnded);
timeline.addEventListener("input", handleTimeLineChange);
timeline.addEventListener("mousedown", handleTimeLineMouseDown);
timeline.addEventListener("mouseup", handleTimeLineMouseUp);
fullScreenBtn.addEventListener("click", handleFullscreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
document.addEventListener("keydown", handleKeyDown);
