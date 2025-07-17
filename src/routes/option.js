const express = require('express');
const router = express.Router();
const optionController = require('../controllers/optionController');
const auth = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { optionSchema } = require('../validation/option');

// Public: List options for a question
router.get('/question/:questionId', optionController.getOptionsByQuestion);

// Admin: Create, update, delete options
router.post('/', auth, isAdmin, validate(optionSchema), optionController.createOption);
router.put('/:id', auth, isAdmin, validate(optionSchema), optionController.updateOption);
router.delete('/:id', auth, isAdmin, optionController.deleteOption);

module.exports = router; 