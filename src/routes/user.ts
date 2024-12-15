import express, { Request, Response, NextFunction } from "express";
import { getUsers, getUser, createUser } from "../services/userService";

const router = express.Router();

router.get("/users/:id", (req: Request, res: Response, next: NextFunction) => {
	getUser(req, res, next);
});

router.get("/users", (req: Request, res: Response, next: NextFunction) => {
	getUsers(req, res, next);
});

router.post("/users", (req: Request, res: Response, next: NextFunction) => {
	createUser(req, res, next);
});

export default router;
