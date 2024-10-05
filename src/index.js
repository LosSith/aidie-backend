const express = require('express');
const dotenv = require('dotenv');
const usersRouter = require('./routes/users.router.js');
const eventsRouter = require('./routes/events.router.js');
const artistsRouter = require('./routes/artists.router.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`Hello! DatabaseURL = ${process.env.DB_URL}`);
});

app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use('/artists', artistsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});