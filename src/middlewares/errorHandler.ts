import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';

// Hata tipi tanımlaması
interface CustomError extends Error {
  isJoi?: boolean;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
  if (err.isJoi) {
    res.status(400).json({ message: 'Bad request' });
    return;
  }

  res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
