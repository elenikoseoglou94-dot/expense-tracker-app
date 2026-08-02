const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const transactionController = require('../controllers/transactionController');

router.use(authMiddleware);
router.get('/', transactionController.getAll);
router.post('/', transactionController.create);
router.delete('/:id', transactionController.remove);
router.get('/summary', transactionController.summary);

module.exports = router;
