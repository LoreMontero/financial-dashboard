// models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../sequelize'; // Adjust the path if necessary

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'users', // The name of the table in the database
});

export default User;
