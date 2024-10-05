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
            const newUser = await database.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [user.name, user.email, user.password]);
            return newUser.rows[0];
        } catch (error) {
            return { error };
        }
    }

    async updateUser(id, user) {
        try {
            const updatedUser = await database.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *', [user.name, user.email, user.password, id]);
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
}

module.exports = new UsersService();
