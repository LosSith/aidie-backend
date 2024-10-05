const database = require('../config/dbConfig.js');

class ArtistsService {
    async getArtists() {
        try {
            const artists = await database.query('SELECT * FROM artists');
            return artists.rows;
        } catch (error) {
            return { error };
        }
    }

    async getArtistById(id) {
        try {
            const artist = await database.query('SELECT * FROM artists WHERE id = $1', [id]);
            return artist.rows[0];
        } catch (error) {
            return { error };
        }
    }

    async createArtist(artist) {
        try {
            const newArtist = await database.query('INSERT INTO artists (name, genre) VALUES ($1, $2) RETURNING *', [artist.name, artist.genre]);
            return newArtist.rows[0];
        } catch (error) {
            return { error };
        }
    }

    async updateArtist(id, artist) {
        try {
            const updatedArtist = await database.query('UPDATE artists SET name = $1, genre = $2 WHERE id = $3 RETURNING *', [artist.name, artist.genre, id]);
            return updatedArtist.rows[0];
        } catch (error) {
            return { error };
        }
    }

    async deleteArtist(id) {
        try {
            const deletedArtist = await database.query('DELETE FROM artists WHERE id = $1 RETURNING *', [id]);
            return deletedArtist.rows[0];
        } catch (error) {
            return { error };
        }
    }

    async getArtistsByGenre(genre) {
        try {
            const artists = await database.query('SELECT * FROM artists WHERE genre = $1', [genre]);
            return artists.rows;
        } catch (error) {
            return { error };
        }
    }
}

module.exports = new ArtistsService();
