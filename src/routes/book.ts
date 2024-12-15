import express, { Request, Response, NextFunction } from "express";
import { getBooks, getBook, createBook } from "../services/bookService";

const router = express.Router();

router.get("/books/:id", (req: Request, res: Response, next: NextFunction) => {
	getBook(req, res, next);
});

router.get("/books", (req: Request, res: Response, next: NextFunction) => {
	getBooks(req, res, next);
});

router.post("/books", (req: Request, res: Response, next: NextFunction) => {
	createBook(req, res, next);
});

export default router;
