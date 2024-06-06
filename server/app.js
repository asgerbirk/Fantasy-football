import express from "express";
import "dotenv/config";
import { UserRouter } from "./routes/UserRouter.js";
import { TeamRouter } from "./routes/TeamRouter.js";
import { PlayerRouter } from "./routes/PlayerRouter.js";
import { FixtureRouter } from "./routes/FixtureRouter.js";
import { StandingRouter } from "./routes/StandingRouter.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(UserRouter);
app.use(TeamRouter);
app.use(PlayerRouter);
app.use(FixtureRouter);
app.use(StandingRouter);

console.log(process.env.PORT);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
