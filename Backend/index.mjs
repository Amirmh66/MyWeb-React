import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import ProductRoute from "./Routes/ProductRoute.mjs";
import UserRoute from "./Routes/UserRoute.mjs";
const app = express();
const db = mongoose.connection;

mongoose.connect("mongodb://localhost:27017/PanelAdmin");

db.on("erorr", (erorr) => console.log(erorr));
db.once("open", () => console.log("Database Connected."));

app.use(cors());
app.use(express.json());
app.use(ProductRoute);
app.use(UserRoute);

app.listen(3000, console.log("Server Is Running On Port 3000"));
