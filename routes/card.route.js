const { Router } = require('express');
const { cardController } = require('../controllers/card.controller');
const router = Router();

router.get('/card', cardController.getCards);
router.post('/card', cardController.createCard);

module.exports = router;