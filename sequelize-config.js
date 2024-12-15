const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    define: {
			underscored: true,
			timestamps: true,
		},
  },
  test: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    define: {
			underscored: true,
			timestamps: true,
		},
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    define: {
			underscored: true,
			timestamps: true,
		},
  }
};