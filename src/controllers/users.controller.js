const usersService = require('../services/users.service.js');
const jwt = require('jsonwebtoken');

class UsersController {
    async getUsers(req, res) {
        try {
            const users = await usersService.getUsers();
            res.json(users);
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    async getUserById(req, res) {
        const id = req.params.id;
        try {
            const user = await usersService.getUserById(id);
            res.json(user);
        } catch (error) {
            res.status(404).json({ error });
        }
    }

    async createUser(req, res) {
        const user = req.body;
        try {
            const existingUser = await usersService.getUserByEmail(user.email);
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            await usersService.createUser(user);
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
            res.status(404).json({ error });
        }
    }
    
    async postLogin (req, res) {
        const { email, password } = req.body;
        try {
            const user = await usersService.getUserByEmailAndPassword(email, password);
            if (user) {
                const { password, id, ...rest } = user;
                const token = jwt.sign({user: rest}, 'JWT');
                res.json({ token, id });
            } else {
                res.status(401).json({ message: 'Login failed' });
            }
        } catch (error) {
            res.json({ error });
    }   
}
}


module.exports = new UsersController();
