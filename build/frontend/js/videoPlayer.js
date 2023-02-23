"use strict";

var video = document.querySelector("video");
var playBtn = document.getElementById("play");
var playBtnIcon = playBtn.querySelector("i");
var muteBtn = document.getElementById("mute");
var muteBtnIcon = muteBtn.querySelector("i");
var volumeRange = document.getElementById("volume");
var currentTime = document.getElementById("currentTime");
var totalTime = document.getElementById("totalTime");
var timeline = document.getElementById("timeline");
var fullScreenBtn = document.getElementById("fullScreen");
var videoContainer = document.getElementById("videoContainer");
var videoControls = document.getElementById("videoControls");
var controlsTimeoutId = null;
var mouseStopTimeoutId = null;
var volumeValue = volumeRange.value;
video.volume = volumeRange.value;
var videoPauseStatus = true;
var handlePlayClick = function handlePlayClick(e) {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};
var handleMuteClick = function handleMuteClick(e) {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};
var handleVolumeChange = function handleVolumeChange() {
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = volumeRange.value;
  video.volume = volumeRange.value;
  console.log("레인지 밸류: ", volumeRange.value);
  console.log("실제비디오 볼륨: ", video.volume);
};
var formatTime = function formatTime(seconds) {
  return new Date(seconds * 1000).toISOString().substring(14, 19);
};
var handleLoadedMetadata = function handleLoadedMetadata() {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};
var handleTimeUpdate = function handleTimeUpdate(event) {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};
var handleTimeLineChange = function handleTimeLineChange(event) {
  var value = event.target.value;
  video.currentTime = value;
};
var handleTimeLineMouseDown = function handleTimeLineMouseDown() {
  videoPauseStatus = video.paused ? true : false;
  console.log(video.paused);
  video.pause();
};
var handleTimeLineMouseUp = function handleTimeLineMouseUp() {
  if (videoPauseStatus) {
    video.pause();
  } else {
    video.play();
  }
};
var handleFullscreen = function handleFullscreen() {
  var fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
};
var hideControls = function hideControls() {
  return videoControls.classList.remove("showing");
};
var handleMouseMove = function handleMouseMove() {
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
var handleMouseLeave = function handleMouseLeave() {
  controlsTimeoutId = setTimeout(hideControls, 300);
};
var handleKeyDown = function handleKeyDown(e) {
  if (e.target === document.body && e.key === " ") {
    handlePlayClick();
  }
  if (e.target === document.body && e.key === "m") {
    handleMuteClick();
  }
};
var handleEnded = function handleEnded() {
  var id = videoContainer.dataset.id;
  fetch("/api/videos/".concat(id, "/views"), {
    method: "POST"
  });
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