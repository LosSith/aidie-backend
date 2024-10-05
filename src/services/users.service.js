const database = require('../config/dbConfig.js');

class UsersService {
    async getUsers() {
        try {
            const users = await database.query('SELECT * FROM users');
            return users.rows;
        } catch (error) {
            return { error };
        }
    }

    async getUserById(id) {
        try {
            const user = await database.query('SELECT * FROM users WHERE id = $1', [id]);
            return user.rows[0];
        } catch (error) {
            return { error };
        }
    }

    async createUser(user) {
        try {
            const newUser = await database.query('INSERT INTO users (name, lastname, email, birthdate, password, address, region, commune) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [user.name, user.lastname, user.email, user.birthdate, user.password, user.address, user.region, user.commune]);
            return newUser.rows[0];
        } catch (error) {
            return { error };
        }
    }

    async updateUser(id, user) {
        try {
            const updatedUser = await database.query(
                'UPDATE users SET name = $1, lastname = $2, email = $3, birthdate = $4, password = $5, address = $6, region = $7, commune = $8 WHERE id = $9 RETURNING *',
                [user.name, user.lastname, user.email, user.birthdate, user.password, user.address, user.region, user.commune, id]
            );
            return updatedUser.rows[0];
        } catch (error) {
            return { error };
        }
    }

    async deleteUser(id) {
        try {
            const deletedUser = await database.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
            return deletedUser.rows[0];
        } catch (error) {
            return { error };
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await database.query('SELECT * FROM users WHERE email = $1', [email]);
            return user.rows[0];
        } catch (error) {
            return { error };
        }
    }

    async getUserByEmailAndPassword(email, password) {
        try {
            const user = await database.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
            return user.rows[0];
        } catch (error) {
            return { error };
        }
    }

    async getEventsByUserId(id) { // move to events service
        try {
            const events = await database.query('SELECT * FROM events WHERE id IN (SELECT idEvent FROM userEvents WHERE idUser = $1)', [id]);
            return events.rows;
        } catch (error) {
            return { error };
        }
    }
}

module.exports = new UsersService();
