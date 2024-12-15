import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import bookRoutes from "./routes/book";
import bookViewingRoutes from "./routes/bookViewing";
import userRoutes from "./routes/user";
import errorHandler from "./middlewares/errorHandler";



const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bookRoutes);
app.use(bookViewingRoutes);
app.use(userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	errorHandler(err, req, res, next);
});

app.listen(port, () => {
	console.log(`server listen ${port}  `);
});

export default app;
