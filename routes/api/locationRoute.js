const router = require('express').Router();
const { Trips, Travellor } = require('../../models');

// GET all locations
router.get('/', async (req, res) => {
  try {
    const locationData = await Location.findAll({
      include: [{ model: Travellor }],
    });
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single location
router.get('/:id', async (req, res) => {
  try {
    const locationData = await Location.findByPk(req.params.id, {
      include: [{ model: Reader }],
    });

    if (!locationData) {
      res.status(404).json({ message: 'No location found!' });
      return;
    }

    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a location
router.post('/', async (req, res) => {
  try {
    const locationData = await Location.create({
      reader_id: req.body.reader_id,
    });
    res.status(200).json(locationData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a location
router.delete('/:id', async (req, res) => {
  try {
    const libraryCardData = await Location.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!libraryCardData) {
      res.status(404).json({ message: 'No library card No location found!' });
      return;
    }

    res.status(200).json(libraryCardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;