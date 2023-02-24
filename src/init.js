import "dotenv/config";
import "./db";
import "./models/video";
import "./models/user";
import "./models/comment";
import app from "./server";

// const PORT = 4000;
const PORT = process.env.PORT || "8080";

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, "0.0.0.0");
// app.listen(PORT, handleListening);
