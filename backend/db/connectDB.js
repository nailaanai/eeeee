import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('thefilmtest_2', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`MySQL Connected: ${sequelize.config.host}`);
  } catch (error) {
    console.log("Error connecting to MySQL: ", error.message);
    process.exit(1); // 1 is failure, 0 status code is success
  }
};

export default sequelize; // Export sequelize instance


