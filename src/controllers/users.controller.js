const usersService = require('../services/users.service.js');

class UsersController {
    async getUsers(req, res) {
        try {
            const users = await usersService.getUsers();
            res.json(users);
        } catch (error) {
            res.json({ error });
        }
    }

    async getUserById(req, res) {
        const id = req.params.id;
        try {
            const user = await usersService.getUserById(id);
            res.json(user);
        } catch (error) {
            res.json({ error });
        }
    }

    async createUser(req, res) {
        const user = req.body;
        try {
            const newUser = await usersService.createUser(user);
            res.json({ message: 'successfully registered user' });
        } catch (error) {
            res.json({ error });
        }
    }

    async updateUser(req, res) {
        const id = req.params.id;
        const user = req.body;
        try {
            const updatedUser = await usersService.updateUser(id, user);
            res.json(updatedUser);
        } catch (error) {
            res.json({ error });
        }
    }

    async deleteUser(req, res) {
        const id = req.params.id;
        try {
            const deletedUser = await usersService.deleteUser(id);
            res.json(deletedUser);
        } catch (error) {
            res.json({ error });
        }
    }

    async getUserByEmailAndPassword(req, res) {
        const { email, password } = req.body;
        try {
            const user = await usersService.getUserByEmailAndPassword(email, password);
            res.json(user);
        } catch (error) {
            res.json({ error });
        }
    }
    
    async postLogin (req, res) {
        const { email, password } = req.body;
        try {
            const user = await usersService.getUserByEmailAndPassword(email, password);
            if (user) {
                res.json({ message: 'Hello' });
            } else {
                res.json({ message: 'Login failed' });
            }
        } catch (error) {
            res.json({ error });
    }   
}
}


module.exports = new UsersController();
