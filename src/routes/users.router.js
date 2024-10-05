const { Router } = require('express');
const database = require('../config/dbConfig.js');

const router = Router();

router.get('/', (req, res) => {
    database.query('SELECT * FROM users')
        .then(result => {
            res.json(result.rows);
        })
        .catch(error => {
            res.json({ error });
        });
});

module.exports = router;
