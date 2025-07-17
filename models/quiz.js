'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Course, { foreignKey: 'courseId' });
      this.hasMany(models.Question, { foreignKey: 'quizId' });
      this.hasMany(models.QuizAttempt, { foreignKey: 'quizId' });
    }
  }
  Quiz.init({
    courseId: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Quiz',
  });
  return Quiz;
};