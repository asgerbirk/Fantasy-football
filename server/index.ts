import express from "express";
import "dotenv/config";
import { FixtureRouter } from "./src/api/routes/FixtureRouter.js";
import cors from "cors";
import UserRouter from "./src/api/routes/UserRouter.js";
import AuthRouter from "./src/api/routes/AuthRouter.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/users", UserRouter);
app.use("/", AuthRouter);
app.use(FixtureRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
