'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizAttempt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Quiz, { foreignKey: 'quizId' });
    }
  }
  QuizAttempt.init({
    userId: DataTypes.INTEGER,
    quizId: DataTypes.INTEGER,
    score: DataTypes.FLOAT,
    attemptAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'QuizAttempt',
  });
  return QuizAttempt;
};