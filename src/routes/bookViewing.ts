import express, { Request, Response, NextFunction } from "express";
import { borrowBook, returnBook } from "../services/bookViewingService";

const router = express.Router();

router.post("/users/:userId/borrow/:bookId", (req: Request, res: Response, next: NextFunction) => {
	borrowBook(req, res, next);
});

router.post("/users/:userId/return/:bookId", (req: Request, res: Response, next: NextFunction) => {
	returnBook(req, res, next);
});

export default router;
