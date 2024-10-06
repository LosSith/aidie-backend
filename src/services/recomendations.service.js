const database = require('../config/dbConfig.js');
const OpenAI = require('openai');
const config = require('../config/config.js');

class RecomendationsService {
    // we need to recomend an event based on the user liked events, using the user id as parameter
    async getRecomendations(user) {

        // console.log({
        //     openai: config.openai,
        // })

        // console.log({
        //     organization: config.openai.orgId,
        //     project: `$${config.openai.projectId}`,
        // })

        // const openai = new OpenAI({
        //     organization: config.openai.orgId,
        //     project: `${config.openai.projectId}`,
        //     apiKey: config.openai.apiKey,
        // });

        const userId = user.id;

        console.log(`Getting recomendations for user ${userId}`);

        // get all events liked by the user
        const likedEvents = (await database.query('SELECT * FROM events WHERE id IN (SELECT idevent FROM userevents WHERE iduser = $1)', [userId])).rows;
        // const likedEvents = await database.query('SELECT * FROM events ', [userId]);
        console.log({likedEvents});


        // return;
        // get all future events
        const futureEvents = (await database.query('SELECT * FROM events WHERE date > NOW()')).rows;

        console.log({futureEvents});

        // add artist to each event, with their genre
        for (const event of futureEvents) {
            const artist = await database.query('SELECT name, genre FROM artists WHERE id = $1', [event.id_artist]);
            event.artist = JSON.stringify(artist.rows[0]);
            delete event.id_artist;
        }

        // get artists of liked events
        const artists = [];

        for (const event of likedEvents) {
            const artist = await database.query('SELECT * FROM artists WHERE id = $1', [event.id_artist]);
            artists.push(artist.rows[0]);
        }

        console.log({artists});

        // get a list of genres of liked artists
        let genres = [];

        for (const artist of artists) {
            genres.push(artist.genre);
        }

        // if genre is divided by / we need to split it
        genres = genres.map(genre => genre.split('/')).flat();

        //remove duplicates
        genres = [...new Set(genres)];

        // calculate age of user by birthdate
        const birthdate = new Date(user.birthdate);
        const age = new Date().getFullYear() - birthdate.getFullYear();

        console.log({genres, age, futureEvents});

        // const stream = await openai.chat.completions.create({
        //     model: "gpt-4o-mini",
        //     messages: [{ role: "user", content: "Say this is a test" }],
        //     stream: true,
        // });
        // for await (const chunk of stream) {
        //     process.stdout.write(chunk.choices[0]?.delta?.content || "");
        //     // console.log(chunk);
        // }

        // filter events by favorite genres
        const recomendations = futureEvents.filter(event => {
            const artist = JSON.parse(event.artist);
            const artistGenres = artist.genre.split('/').flat();
            return genres.some(genre => artistGenres.includes(genre));
        });

        return recomendations;

    }
}

module.exports = new RecomendationsService();
