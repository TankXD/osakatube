import mongoose from "mongoose";

// mongoose.connect(process.env.MONGO_ATLAS_URL);
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const handleOpen = () => console.log("✔ connected!");
const handleError = (error) => console.log("❗ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
