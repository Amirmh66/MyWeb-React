import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import ProductRoute from "./Routes/ProductRoute.mjs";
import UserRoute from "./Routes/UserRoute.mjs";
import CategoryRoute from "./Routes/CategoryRoute.mjs";
import RoleRoute from "./Routes/RoleRoute.mjs";
import LoginRoute from "./Routes/AuthRoute.mjs";
import bodyParser from "body-parser";
import middlewareRoute from "./Routes/middlewareRoute.mjs";

const app = express();
const db = mongoose.connection;
mongoose.connect("mongodb://localhost:27017/PanelAdmin");

db.on("erorr", (erorr) => console.log(erorr));
db.once("open", () => console.log("Server Is Running."));

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(ProductRoute);
app.use(UserRoute);
app.use(CategoryRoute);
app.use(RoleRoute);
app.use(LoginRoute);
app.use(middlewareRoute);

app.listen(3000, console.log(`Server Is Running On Port 3000`));