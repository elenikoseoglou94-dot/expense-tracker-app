const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const categoryController = require('../controllers/categoryController');

router.use(authMiddleware);
router.get('/', categoryController.getAll);
router.post('/', categoryController.create);
router.delete('/:id', categoryController.remove);



// experimental param rename
