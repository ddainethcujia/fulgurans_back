import { Sequelize } from 'sequelize';

const DB_NAME = process.env.DB_NAME as string
const DB_USER = process.env.DB_USER as string
const DB_PASS = process.env.DB_PASS
const DB_HOST = process.env.DB_HOST

export const database = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,
    {
        host: DB_HOST,
        dialect: 'mysql',
        port: 3306
    }
);;

async function generateDb() {
    await database.sync();
    console.log('Base de datos y tablas creadas');
}

generateDb();
