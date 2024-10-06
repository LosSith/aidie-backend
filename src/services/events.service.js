const database = require('../config/dbConfig.js');

class EventsService {
    async getEvents(userId) {
        try {
            const events = await database.query('SELECT * FROM events');
            // check if events are liked by current user
            for (const event of events.rows) {
                const liked = await database.query('SELECT * FROM userEvents WHERE idUser = $1 AND idEvent = $2', [userId, event.id]);
                event.liked = liked.rows.length > 0;
            }
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
                'INSERT INTO events (id, date, location, presaledate, generalsaledate, imageurl, id_artist, description, name, event_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
                [event.id, event.date, event.location, event.presaledate, event.generalsaledate, event.imageurl, event.id_artist, event.description, event.name, event.event_url]
            );
            return newEvent.rows[0];
        } catch (error) {
            return { error };
        }
    }

    async updateEvent(id, event) {
        try {
            const updatedEvent = await database.query(
                'UPDATE events SET date = $1, location = $2, presaledate = $3, generalsaledate = $4, imageurl = $5, id_artist = $6, description = $7, name = $8, event_url = $9 WHERE id = $10 RETURNING *',
                [event.date, event.location, event.presaledate, event.generalsaledate, event.imageurl, event.id_artist, event.description, event.name, event.event_url, id]
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

    async setEventLikeFromUser(idEvent, idUser) {
        try {
            console.log({idUser, idEvent});
            const newLike = await database.query('INSERT INTO userEvents (idUser, idEvent) VALUES ($1, $2) RETURNING *', [idUser, idEvent]);
            return newLike.rows[0];
        } catch (error) {
            return { error };
        }
    }
}

module.exports = new EventsService();