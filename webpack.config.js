// webpack은, 최신 JS -> 구식 JS, Sass -> 구식css, .jpg -> 압축된 jpg
// 이런식으로 변형,압축, 최소화 등 필요한 작업들을 거치고 정리된 코드를 결과물로 주는 패키지

// webpack.config.js파일안에는 JS구식문법을 써야함.

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const BASE_JS = "./src/frontend/js/";
// 매번 경로를 쓰면 오타도 날 수 있기에 경로전용 변수를 만듬

module.exports = {
  // entry속성 : 최신코드로 작성한 webpack으로 처리할 js파일의 경로를 입력.
  entry: {
    main: BASE_JS + "main.js",
    videoPlayer: BASE_JS + "videoPlayer.js",
    commentSection: BASE_JS + "commentSection.js",
    header: BASE_JS + "header.js",
    // recorder: "./src/frontend/js/recorder.js",
  },
  plugins: [new MiniCssExtractPlugin({ filename: "css/styles.css" })],
  //   mode속성 : 현재 코드가 development(개발중)인지, production(완성)된건지 알려줘야함. (완성본이라면 webpack으로 변형할 때 압축해서 변형해줌.)
  // mode: "development",
  // 개발중이아닌 배포하기위해 build하는 경우 development모드면 코드가 길어지기때문에, mode는 script명령어실행할때 따로 전달해서 정하기.
  // watch: true,
  // watch또한 개발중인경우에 계속 프론트엔드코드가 자동갱신되면서 확인하기위해 쓰는것인데 build하는경우 따로 mode처럼 script명령어에 전달해서 정한다.

  // output속성 : 파일을 webpack에서 처리한 후에 어떤 경로에 어떤파일명으로 저장할지 설정해주는 속성
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
    // path에는 절대경로를 써야함. 즉, src폴더라면 내 컴퓨터내에 src폴더의 경로가 어딘지까지 처음부터 끝까지 써야함.
    // path.resolve() : 인자에 경로들을 쓰고, 해당 경로들을 자연스럽게 1줄의 경로로 반환해줌
    // __dirname : 현재 경로를 절대경로로 반환해줌
  },
  module: {
    // module -> rules: 어떤 종류의 확장자파일을 어떤로더들로 변형시킬지 적는 곳
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
