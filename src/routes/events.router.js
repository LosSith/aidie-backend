const { Router } = require('express');
const eventsController = require('../controllers/events.controller.js');

const router = Router();

router.get('/', eventsController.getEvents);
router.post('/', eventsController.createEvent);
router.get('/:id', eventsController.getEventById);
router.put('/:id', eventsController.updateEvent);
router.delete('/:id', eventsController.deleteEvent);
router.get('/user', eventsController.getEventsByUserId);
router.post('/like', eventsController.setEventLikeFromUser);

module.exports = router;

