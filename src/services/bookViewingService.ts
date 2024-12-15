import { Request, Response, NextFunction } from 'express';
import db from '../models';
import Joi from 'joi';
import { BookState } from '../enums/bookState';
import { ForeignKeyConstraintError } from 'sequelize';



const borrowBookValidator = Joi.object({
  bookId: Joi.number().integer().required(),
  userId: Joi.number().integer().required(),
});

export const borrowBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const bookViewRequest = { bookId: parseInt(req.params.bookId), userId: parseInt(req.params.userId) };
    Joi.attempt(bookViewRequest, borrowBookValidator);

    const isAlreadyBorrowed = await db.BookViewing.findOne({
      where: { bookId: bookViewRequest.bookId, state: BookState.BORROWED },
    });

    if (isAlreadyBorrowed) {
      res.status(400).json({ message: 'Book already borrowed' });
      return;
    }

    await db.BookViewing.create(bookViewRequest);
    res.sendStatus(204)
  } catch (e) {
    console.log(e);
    if (e instanceof ForeignKeyConstraintError) {
      res.status(400).json({ message: 'Book or user id incorrect' });
      return;
    }
    next(e);
  }
};


const returnBookValidator = Joi.object({
  bookId: Joi.number().integer().required(),
  userId: Joi.number().integer().required(),
  score: Joi.number().integer().min(1).max(10).required(),
});


export const returnBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const bookViewRequest = { bookId: parseInt(req.params.bookId), userId: parseInt(req.params.userId), ...req.body };
    Joi.attempt(bookViewRequest, returnBookValidator);

    const bookView = await db.BookViewing.findOne({
      where: { bookId: req.params.bookId, userId: req.params.userId, state: BookState.BORROWED },
    });

    if (!bookView) {
      res.status(404).json({ message: 'Book view not found' });
      return;
    }

    bookView.state = BookState.RETURNED;
    bookView.userScore = bookViewRequest.score;
    await bookView.save();
    res.sendStatus(204)
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export default {
  borrowBook,
  returnBook,
};
