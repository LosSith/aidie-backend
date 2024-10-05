const artistsService = require('../services/artists.service');

class ArtistsController {
    async getArtists(req, res) {
        try {
            const artists = await artistsService.getArtists();
            res.json(artists);
        } catch (error) {
            res.json({ error });
        }
    }

    async getArtistById(req, res) {
        const id = req.params.id;
        try {
            const artist = await artistsService.getArtistById(id);
            res.json(artist);
        } catch (error) {
            res.json({ error });
        }
    }

    async createArtist(req, res) {
        const artist = req.body;
        try {
            const newArtist = await artistsService.createArtist(artist);
            res.json(newArtist);
        } catch (error) {
            res.json({ error });
        }
    }

    async updateArtist(req, res) {
        const id = req.params.id;
        const artist = req.body;
        try {
            const updatedArtist = await artistsService.updateArtist(id, artist);
            res.json(updatedArtist);
        } catch (error) {
            res.json({ error });
        }
    }

    async deleteArtist(req, res) {
        const id = req.params.id;
        try {
            const deletedArtist = await artistsService.deleteArtist(id);
            res.json(deletedArtist);
        } catch (error) {
            res.json({ error });
        }
    }

    async getArtistsByGenre(req, res) {
        const genre = req.params.genre;
        try {
            const artists = await artistsService.getArtistsByGenre(genre);
            res.json(artists);
        } catch (error) {
            res.json({ error });
        }
    }
}

module.exports = new ArtistsController();
