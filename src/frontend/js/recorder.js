// const startBtn = document.getElementById("startBtn");
// const video = document.getElementById("preview");

// let stream;
// let recorder;
// let videoFile;

// const handleDownload = () => {
//   const a = document.createElement("a");
//   a.href = videoFile;
//   a.download = "RecordingVideo.webm";
//   document.body.appendChild(a);
//   a.click();
// };

// const handleStop = async () => {
//   startBtn.innerText = "Download Recording";
//   startBtn.removeEventListener("click", handleStop);
//   startBtn.addEventListener("click", handleDownload);
//   recorder.stop();
// };

// const handleStart = async () => {
//   startBtn.innerText = "Stop Recording";
//   startBtn.removeEventListener("click", handleStart);
//   startBtn.addEventListener("click", handleStop);

//   recorder = new MediaRecorder(stream);
//   recorder.ondataavailable = (event) => {
//     videoFile = URL.createObjectURL(event.data);
//     console.log(videoFile);
//     video.srcObject = null;
//     video.src = videoFile;
//     video.loop = true;
//     video.play();
//   };
//   // recorder.ondataavailable은 이벤트핸들러이다. recorder가 끝나게되면 dataavailable함수를 불러와주는 것
//   // 즉, recorder.addEventListener("dataavailable",(event)=> {})와 같다고 할 수 있음

//   recorder.start();
// };

// const init = async () => {
//   stream = await navigator.mediaDevices.getUserMedia({
//     audio: true,
//     // video: { width: 500, height: 400 },
//     video: true,
//   });
//   video.srcObject = stream;
//   video.play();
// };

// init();

// startBtn.addEventListener("click", handleStart);
