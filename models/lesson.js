'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Course, { foreignKey: 'courseId' });
      this.hasMany(models.Progress, { foreignKey: 'lessonId' });
    }
  }
  Lesson.init({
    courseId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    videoUrl: DataTypes.STRING,
    resources: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Lesson',
  });
  return Lesson;
};