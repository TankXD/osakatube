import bcrypt from "bcrypt";
// hash를 쓰는 bcrypt를 쓰기 위해 import
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  name: { type: String, require: true },
  location: String,
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
  // bcrypt.hash(해싱할비번,솔트횟수)
  // 여기서 솔트 횟수는, 한번만 해싱하면 레인보우테이블에 해킹위험이 있어서
  // 여러번 해싱해주는 것.
});

const user = mongoose.model("user", userSchema);

export default user;
