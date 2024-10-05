const eventsService = require('../services/events.service.js');

class EventsController {
    async getEvents(req, res) {
        try {
            const events = await eventsService.getEvents();
            res.json(events);
        } catch (error) {
            res.json({ error });
        }
    }

    async getEventById(req, res) {
        const id = req.params.id;
        try {
            const event = await eventsService.getEventById(id);
            res.json(event);
        } catch (error) {
            res.json({ error });
        }
    }

    async createEvent(req, res) {
        const event = req.body;
        try {
            const newEvent = await eventsService.createEvent(event);
            res.json(newEvent);
        } catch (error) {
            res.json({ error });
        }
    }

    async updateEvent(req, res) {
        const id = req.params.id;
        const event = req.body;
        try {
            const updatedEvent = await eventsService.updateEvent(id, event);
            res.json(updatedEvent);
        } catch (error) {
            res.json({ error });
        }
    }

    async deleteEvent(req, res) {
        const id = req.params.id;
        try {
            const deletedEvent = await eventsService.deleteEvent(id);
            res.json(deletedEvent);
        } catch (error) {
            res.json({ error });
        }
    }

    async getEventsByUserId(req, res) {
        const id = req.params.id;
        try {
            const events = await eventsService.getEventsByUserId(id);
            res.json(events);
        } catch (error) {
            res.json({ error });
        }
    }

    async setEventLikeFromUser(req, res) {
        const { idUser, idEvent } = req.body;
        try {
            const event = await eventsService.setEventLikeFromUser(idUser, idEvent);
            res.json(event);
        } catch (error) {
            res.json({ error });
        }
    }
}

module.exports = new EventsController();
