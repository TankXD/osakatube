import Video from "../models/video";

export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" });
  return res.render("home", { pageTitle: "Home", videos });
};

export const watchVideos = async (req, res) => {
  const { id } = req.params;
  //const id = req.params.id와 같은방법. 하지만 ES6문법으로 쓰면 위에 방식이 된다.
  const video = await Video.findById(id);
  if (!video) {
    // (video === null)로 입력하는 것과 같다.
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  //const id = req.params.id와 같은방법. 하지만 ES6문법으로 쓰면 위에 방식이 된다.
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }

  return res.render("edit", { pageTitle: `Edit : ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.findById(id);
  // exists : 해당 filter(조건문)에 부합하는 video데이터가 있다면 true로
  // 반환해준다. 즉 존재하는지 여부를 반환해주는 것 ※조건은 여러개도 가능하며, id가 아니여도 됨.
  // findById : id값이 맞는 video데이터의 오브젝트를 전부다 반환해줌.
  // getEdit처럼 화면에 video데이터의 오브젝트내용을 출력해줘야할때 사용됨
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  // 해당 함수를 쓰면,video.title = title 이런식으로 하나하나 안써줘도 되고 편하고
  // 추가로 await video.save();사용 없이 업데이트도 한번에 가능하다.
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  // const title = req.body.title;
  // const description = req.body.description;
  // const hashtags = req.body.hashtags;
  // ES6로쓰면 아래와 같다.
  const { title, description, hashtags } = req.body;

  try {
    await Video.create({
      title: title,
      description: description,
      hashtags: Video.formatHashtags(hashtags),
    });

    return res.redirect("/");
  } catch (error) {
    // console.log(error);
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideos = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect(`/`);
};

export const searchVideos = async (req, res) => {
  const { keyword } = req.query;
  // req.query는 url에 있는 query부분 값을 추출해줌.
  // 즉 get메소드로 보내는 내용은 url에 표시되며 전달되는데 그 값을 받는 것
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        // $로시작하는 기능들은 mongodb 기능이다 (mongoose에서찾으면안됨)
        $regex: new RegExp(keyword, "i"),
        // regular expression(정규식)을 이용해서 검색하는 방식.
        // i는 대소문자 구분안한다는 뜻,
        // 정규식을 쓰는순간 그냥 포함되는 것들이 검색된다.
      },
    });
  }

  return res.render("search", { pageTitle: "Search", videos });
};
