const database = require('../config/dbConfig.js');

class EventsService {
    async getEvents() {
        try {
            const events = await database.query('SELECT * FROM events');
            return events.rows;
        } catch (error) {
            return { error };
        }
    }

    async getEventById(id) {
        try {
            const event = await database.query('SELECT * FROM events WHERE id = $1', [id]);
            return event.rows[0];
        } catch (error) {
            return { error };
        }
    }

    async createEvent(event) {
        try {
            const newEvent = await database.query(
                'INSERT INTO events (id, date, location, presaledate, generalsaledate, imageurl, id_artist, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
                [event.id, event.date, event.location, event.presaledate, event.generalsaledate, event.imageurl, event.id_artist, event.description]
            );
            return newEvent.rows[0];
        } catch (error) {
            return { error };
        }
    }

    async updateEvent(id, event) {
        try {
            const updatedEvent = await database.query(
                'UPDATE events SET date = $1, location = $2, presaledate = $3, generalsaledate = $4, imageurl = $5, id_artist = $6, description = $7 WHERE id = $8 RETURNING *',
                [event.date, event.location, event.presaledate, event.generalsaledate, event.imageurl, event.id_artist, event.description, id]
            );
            return updatedEvent.rows[0];
        } catch (error) {
            return { error };
        }
    }

    async deleteEvent(id) {
        try {
            const deletedEvent = await database.query('DELETE FROM events WHERE id = $1 RETURNING *', [id]);
            return deletedEvent.rows[0];
        } catch (error) {
            return { error };
        }
    }

    async getEventsByUserId(id) {
        try {
            const events = await database.query('SELECT * FROM events WHERE id IN (SELECT idEvent FROM userEvents WHERE idUser = $1)', [id]);
            return events.rows;
        } catch (error) {
            return { error };
        }
    }
}

module.exports = new EventsService();