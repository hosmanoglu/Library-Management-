import { Request, Response, NextFunction } from "express";
import db from "../models";
import Joi from "joi";
import { BookState } from "../enums/bookState";
import { BooksResult } from "../types/bookViewResult";


export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const users = await db.User.findAll({attributes:["id","name"]});
		res.json(users);
	} catch (e) {
		console.log(e);
		next(e);
	}
};

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const userId = req.params.id;
		const user = await db.User.findByPk(userId, { attributes: ["id", "name"] });

		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		const userBookViews = await db.BookViewing.findAll({
			where: { userId },
			attributes: ["Book.name", "userScore", "state"],
			include: [
				{
					attributes: ["name"],
					model: db.Book,
				},
			],
		});

		const books = userBookViews.reduce(
			(result, userBookView) => {
				if (userBookView.state === BookState.RETURNED) {
					result.past.push({ name: userBookView.Book.name, userScore: userBookView.userScore });
				} else if (userBookView.state === BookState.BORROWED) {
					result.present.push({ name: userBookView.Book.name });
				}
				return result;
			},
			{ past: [], present: [] } as BooksResult
		);

		res.json({ user, books });
	} catch (e) {
		console.log(e);
		next(e);
	}
};

const userValidator = Joi.object({ name: Joi.string().required() });

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		Joi.attempt(req.body, userValidator);
		await db.User.create(req.body);
		res.sendStatus(201)
	} catch (e) {
		console.log(e);
		next(e);
	}
};

export default {
	getUsers,
	getUser,
	createUser,
};
