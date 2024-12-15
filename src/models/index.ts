import { Sequelize } from "sequelize";
import { initBookModel } from "./book";
import { initUserModel } from "./user";
import { initBookViewingModel } from "./bookViewing";

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
	dialect: "postgres",
	define: {
		underscored: true,
		timestamps: true,
	},
});

const models = {
	Book: initBookModel(sequelize),
	User: initUserModel(sequelize),
	BookViewing: initBookViewingModel(sequelize),
};

Object.values(models).forEach((model) => {
	if ("associate" in model) {
		model.associate(models);
	}
});

const db = { ...models, sequelize, Sequelize };
export default db;
