export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "Tanktube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  // console.log(res.locals);
  next();
};

//- res.locals 같은 경우 pug와 express가 공유하고있는 전역오브젝트변수이기에
//- 다른 명령어 없이 res.locals에 있는 데이터들은 간단하게 쓸 수 있다.
//- 자바스크립트파일에서 res.locals안에 res.locals.sexy라는 오브젝트를 생성했다면
//-  pug파일에서 #{sexy}를 입력해서 바로 사용할 수 있다.
