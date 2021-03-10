import express, { Application, Request, Response, NextFunction } from "express";
import "./db/mongoose";
import userRouter from "./routers/user";
import taskRouter from "./routers/task";

const app: Application = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
