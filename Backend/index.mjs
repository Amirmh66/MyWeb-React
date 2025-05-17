import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import ProductRoute from "./Routes/ProductRoute.mjs";
import UserRoute from "./Routes/UserRoute.mjs";
import CategoryRoute from "./Routes/CategoryRoute.mjs";
import RoleRoute from "./Routes/RoleRoute.mjs";
import LoginRoute from "./Routes/AuthRoute.mjs";
import bodyParser from "body-parser";
import middlewareRoute from "./Routes/middlewareRoute.mjs";
import TypeRoute from "./Routes/TypeRoute.mjs";
import BrandRoute from "./Routes/BrandRoute.mjs";
import SettingRoute from "./Routes/SettingRoute.mjs";
import BlogRoute from "./Routes/BlogRoute.mjs";

const PORT = process.env.PORT;
const app = express();
const db = mongoose.connection;
const CONNECTION_STRING = process.env.CONNECTION_STRING;
if (CONNECTION_STRING) {
  mongoose.connect(CONNECTION_STRING);
}
const corsOptions = {
  origin: "http://localhost:5173",
  credential: true,
};

db.on("erorr", (erorr) => console.log(erorr));
db.once("open", () => console.log("Database Is Running."));

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(ProductRoute);
app.use(UserRoute);
app.use(CategoryRoute);
app.use(RoleRoute);
app.use(LoginRoute);
app.use(middlewareRoute);
app.use(TypeRoute);
app.use(BrandRoute);
app.use(SettingRoute);
app.use(BlogRoute);

app.listen(PORT, console.log(`Server Running On Port ${PORT}`));
