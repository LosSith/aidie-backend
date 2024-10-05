const { Router } = require('express');
const eventsController = require('../controllers/events.controller.js');
const { authMiddleware } = require('../middlewares/authMiddleware.js');

const router = Router();

router.get('/', authMiddleware, eventsController.getEvents);
router.post('/', authMiddleware, eventsController.createEvent);
router.get('/:id', authMiddleware, eventsController.getEventById);
router.put('/:id', authMiddleware, eventsController.updateEvent);
router.delete('/:id', authMiddleware, eventsController.deleteEvent);
router.get('/user/:id', authMiddleware, eventsController.getEventsByUserId);
router.post('/like', authMiddleware, eventsController.setEventLikeFromUser);

module.exports = router;

