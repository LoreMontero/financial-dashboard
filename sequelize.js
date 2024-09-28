// sequelize.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('shellhacks', 'root', 'Blancuso1$', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
