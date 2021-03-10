import express, { Application, Request, Response, NextFunction } from "express";
import Task from "../models/task";
import auth from "../middleware/auth";
import { ParsedUrlQuery } from "node:querystring";

const router = express.Router();

router.post("/tasks", auth, async (req: Request, res: Response) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt:desc
router.get("/tasks", auth, async (req: Request, res: Response) => {
  const match = {};
  if (req.query.completed) {
    //@ts-ignore
    match.completed = req.query.completed === "true";
  }
  let limit: any;
  if (req.query.limit) {
    limit = req.query.limit;
  }
  let skip: any;
  if (req.query.skip) {
    skip = req.query.skip;
  }
  const sort = {};
  if (req.query.sortBy) {
    // @ts-ignore
    const parts = req.query.sortBy.split(":");
    // @ts-ignore
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    const tasks = await Task.find({
      owner: req.user._id,
      ...match,
    })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort(sort);

    res.send(tasks);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", auth, async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id", auth, async (req: Request, res: Response) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates" });

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) return res.status(404).send();

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    // const _id = req.params.id;
    // const task = await Task.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/tasks/:id", auth, async (req: Request, res: Response) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

export { router as default };
