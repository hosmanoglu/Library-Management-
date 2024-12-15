import { Model, DataTypes, Sequelize } from "sequelize";
import { Book } from "./book";
import { User } from "./user";
import { BookState } from "../enums/bookState";

export class BookViewing extends Model {
	declare id: number;
	declare bookId: number;
	declare userId: number;
	declare state: BookState;
	declare userScore: number;
	declare Book: Book;
	declare User: User;

	public static associate(models: any) {
		BookViewing.belongsTo(models.Book, { targetKey: "id", foreignKey: "bookId" });
		BookViewing.belongsTo(models.User, { targetKey: "id", foreignKey: "userId" });
	}
}

export const initBookViewingModel = (sequelize: Sequelize): typeof BookViewing => {
	BookViewing.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			bookId: {
				type: DataTypes.INTEGER,
				references: {
					model: Book,
					key: "id",
				},
			},
			userId: {
				type: DataTypes.INTEGER,
				references: {
					model: User,
					key: "id",
				},
			},
			state: {
				type: DataTypes.ENUM(BookState.BORROWED, BookState.RETURNED),
				defaultValue: "borrowed",
			},
			userScore: {
				type: DataTypes.SMALLINT,
				defaultValue: 0,
			},
		},
		{
			sequelize,
			modelName: "BookViewing",
			tableName: "book_viewings",
		}
	);

	return BookViewing;
};
