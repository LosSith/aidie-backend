const recomendationsService = require('../services/recomendations.service.js');
const usersService = require('../services/users.service.js');
const mailingService = require('../services/mailing.service.js');

class RecomendationsController {
    async getRecomendations(req, res) {
        try {
            const users = await usersService.getUsers();

            if (users.length === 0) {
                return res.json({ message: 'No users found' });
            }

            const recomendationsByUser = [];

            for (const user of users) {
                const recomendations = await recomendationsService.getRecomendations(user);
                if (recomendations.length > 0) {
                    recomendationsByUser.push({ user, recomendations });
                }
            }

            for (const recomendation of recomendationsByUser) {
                const { user, recomendations } = recomendation;
                await mailingService.sendRecomendationsEmail(user, recomendations);
            }

            res.send('Recomendations sent');

            // const recomendations = await recomendationsService.getRecomendations(req.user);
            // res.json(recomendations);
        } catch (error) {
            res.json({ error });
        }
    }
}

module.exports = new RecomendationsController();