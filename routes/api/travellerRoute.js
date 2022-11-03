const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Traveller, Location, Trips} = require('../..models');

// GET all travllers
router.get('/', async (req, res) => {
    try {
        const travellerData = await Traveller.findAll({
            include: [{ model: Trips}, {model: Location}],
        });
        res.status(200).json(travellerData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single travellers
router.get('/:id', async (req, res) => {
    try {
        const travellerData = await Traveller.findByPk(req.params.id, {
            include: [{ model: Trips}, {model: Location}],
        });

        if (!travellerData) {
            res.status(404).json({ message: 'Can not find a travellor' });
            return;
        }

        res.status(200).json(travellerData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a travller
router.post('/', async (req, res) => {
    try {
        const travellerData = await Traveller.create(req.body);
        res.status(200).json(travellerData);
    } catch(err) {
        res.status(400).json(err);
    }
});

// DELETE a traveller
router.delete('/:id', async (req, res) => {
    try{
        const travellerData = await Traveller.destory({
            where:{
                id: req.params.id,
            },
        });

        if (!travellerData) {
            res.status(404).json({ message: 'Can not find a travellor'});
            return;
        }

        res.status(200).json(travellerData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
