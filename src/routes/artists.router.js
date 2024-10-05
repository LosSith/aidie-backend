const { Router } = require('express');
const artistsController = require('../controllers/artists.controller.js');

const router = Router();

router.get('/', artistsController.getArtists);
router.post('/', artistsController.createArtist);
router.get('/:id', artistsController.getArtistById);
router.put('/:id', artistsController.updateArtist);
router.delete('/:id', artistsController.deleteArtist);
router.get('/genre/:genre', artistsController.getArtistsByGenre);
router.post('/like', artistsController.setArtistLikeFromUser);

module.exports = router;
