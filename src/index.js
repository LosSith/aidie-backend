const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users.router.js');
const eventsRouter = require('./routes/events.router.js');
const artistsRouter = require('./routes/artists.router.js');
const { authMiddleware } = require('./middlewares/authMiddleware.js');
const config = require('./config/config.js');

const app = express();
const PORT = config.port || 3000;

app.use(cors());
app.use(express.json());

app.use('/users', authMiddleware, usersRouter);
app.use('/events', authMiddleware, eventsRouter);
app.use('/artists', authMiddleware, artistsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});