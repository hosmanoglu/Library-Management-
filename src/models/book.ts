import { Model, DataTypes, Sequelize, Association } from 'sequelize';
import { BookViewing } from './bookViewing'; 

export class Book extends Model {
  declare  id: number;
  declare  name: string;

  public static associations: {
    bookViewings: Association<Book, BookViewing>;
  };

  public static associate(models: any) {
    Book.hasMany(models.BookViewing, { sourceKey: 'id', foreignKey: 'bookId' });
  }
}

export const initBookModel = (sequelize: Sequelize): typeof Book => {
  Book.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Book',
      tableName: 'books',
    }
  );

  return Book;
};
