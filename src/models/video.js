import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  createdAt: { type: Date, required: true, default: Date.now },
  /*Date.now()처럼 괄호를 쓰지 않고 Date.now만 쓰는 이유는,
  알다시피 ()를 쓰게되면 함수가 바로 실행될 것이기 때문.  
  원하는 것처럼, 새로운 video를 생성했을 때만 실행하게 하려면 괄호를 빼고 써야함*/
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

// 미들웨어나 static함수 생성 등 해당 작업들은
// model을 생성하는 코드보다 이전에 작성해야한다.

const Video = mongoose.model("Video", videoSchema);

// videomodel은 Video이런식으로 대문자를 쓰는 것이 좋다.
// 왜냐면 모델명을 video로 만들어 버렸다면
// 실제 실제로 controller에서 videomodel(video)을 쓸때
// controller에서 따로 video라는 변수를 만들면
// 이름이 겹쳐서 오류가 날 수 있기 때문
export default Video;
