import bcrypt from "bcrypt";
// hash를 쓰는 bcrypt를 쓰기 위해 import
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  avatarUrl: String,
  username: { type: String, require: true, unique: true },
  // unique:true속성을 걸어주면, 이미 존재하는 email or username을 db에 넣으려고할 때
  // 에러가 뜨고 생성이 안되게 해줌
  socialOnly: { type: Boolean, default: false },
  password: { type: String },
  name: { type: String, require: true },
  location: String,
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
  // bcrypt.hash(해싱할비번,솔트횟수)
  // 여기서 솔트 횟수는, 한번만 해싱하면 레인보우테이블에 해킹위험이 있어서
  // 여러번 해싱해주는 것.
});

const User = mongoose.model("User", userSchema);
// usermodel은 User이런식으로 대문자를 쓰는 것이 좋다.
// 왜냐면 실제로 controller에서 Usermodel을 쓸때 따로 user라는 변수를 만들면
// 이름이 겹쳐서 오류가 날 수 있기 때문
export default User;
