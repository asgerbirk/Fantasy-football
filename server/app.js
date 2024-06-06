import express from "express";
import "dotenv/config";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

import { UserRouter } from "./routes/UserRouter.js";
app.use(UserRouter);

console.log(process.env.PORT);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
