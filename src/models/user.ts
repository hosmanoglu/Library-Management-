import { Model, DataTypes, Sequelize } from 'sequelize';

export class User extends Model {
  declare  id: number;
  declare  name: string;

  public static associate(models: any) {
    User.hasMany(models.BookViewing, { sourceKey: 'id', foreignKey: 'userId' });
  }
}

export const initUserModel = (sequelize: Sequelize): typeof User => {
  User.init(
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
      modelName: 'User',
      tableName: 'users',
    }
  );

  return User;
};
