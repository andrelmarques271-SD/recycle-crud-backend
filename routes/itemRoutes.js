const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/itemController');

router.get('/', ItemController.list);
router.get('/:id', ItemController.getOne);
router.post('/', ItemController.create);
router.put('/:id', ItemController.update);
router.delete('/:id', ItemController.remove);

module.exports = router;
