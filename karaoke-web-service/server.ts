import express from "express";
import router from "./lib/routes/v1";
import cors from "cors";
import config from "config";

const app = express();
const port = process.env.PORT || 5000;

const originCors = new RegExp(config.get("origin"));

const corsOptions = {
  origin: originCors,
  credentials: true
}

app.use(cors(corsOptions));
app.use("/", router);

app.listen(port, () => console.log(`Listening on port ${port}`));