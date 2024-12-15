import { Request, Response, NextFunction } from "express";
import db from "../models";
import Joi from "joi";

export const getBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const books = await db.Book.findAll({ attributes: ["id", "name"] });
		res.json(books);
	} catch (e) {
		console.log(e);
		next(e);
	}
};

export const getBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const book = await db.Book.findByPk(req.params.id, {
			attributes: [
				"id",
				"name",
				[db.sequelize.fn("ROUND", db.sequelize.fn("AVG", db.sequelize.col("BookViewings.user_score")), 2), "score"],
			],
			include: [
				{
					model: db.BookViewing,
					attributes: [],
				},
			],
			group: ["Book.id"],
		});

		if (!book) {
			res.status(404).json({ message: "Book not found" });
			return;
		}
		res.json(book);
	} catch (e) {
		console.log(e);
		next(e);
	}
};

const bookValidator = Joi.object({ name: Joi.string().required() });

export const createBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		Joi.attempt(req.body, bookValidator);
		await db.Book.create(req.body);
        res.sendStatus(201)
	} catch (e) {
		console.log(e);
		next(e);
	}
};
