const app = require('./app');
const db = require('../models');

const PORT = process.env.PORT || 5000;

// Test DB connection and start server
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connection established.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
})();
