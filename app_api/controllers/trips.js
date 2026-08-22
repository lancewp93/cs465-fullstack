const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');
const { validateTripCode, validateTripPayload } = require('../validation');

// GET: /trips - lists all the trips
const tripsList = async(req, res) => {
    try {
        const trips = await Model.find({}).exec();
        return res.status(200).json(trips);
    } catch (error) {
        return res.status(500).json({ message: 'Unable to fetch trips.', error: error.message });
    }
};

// GET: /trips/:tripCode - lists a single trip
const tripsFindByCode = async(req, res) => {
    const validationError = validateTripCode(req.params.tripCode);

    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    try {
        const trip = await Model.find({ code: req.params.tripCode }).exec();

        if (!trip || trip.length === 0) {
            return res.status(404).json({ message: 'Trip not found.' });
        }

        return res.status(200).json(trip);
    } catch (error) {
        return res.status(500).json({ message: 'Unable to find trip.', error: error.message });
    }
};

// POST: /trips - Adds a new Trip
const tripsAddTrip = async(req, res) => {
    const validationError = validateTripPayload(req.body);

    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    try {
        const newTrip = new Trip({
            code: req.body.code.trim(),
            name: req.body.name.trim(),
            length: req.body.length.trim(),
            start: req.body.start,
            resort: req.body.resort.trim(),
            perPerson: req.body.perPerson.trim(),
            image: req.body.image.trim(),
            description: req.body.description.trim()
        });

        const savedTrip = await newTrip.save();
        return res.status(201).json(savedTrip);
    } catch (error) {
        return res.status(500).json({ message: 'Unable to add trip.', error: error.message });
    }
};

// PUT: /trips/:tripCode - Updates a trip
const tripsUpdateTrip = async(req, res) => {
    const validationError = validateTripCode(req.params.tripCode) || validateTripPayload(req.body);

    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    try {
        const updatedTrip = await Model.findOneAndUpdate(
            { code: req.params.tripCode },
            {
                code: req.body.code.trim(),
                name: req.body.name.trim(),
                length: req.body.length.trim(),
                start: req.body.start,
                resort: req.body.resort.trim(),
                perPerson: req.body.perPerson.trim(),
                image: req.body.image.trim(),
                description: req.body.description.trim()
            },
            { new: true }
        ).exec();

        if (!updatedTrip) {
            return res.status(404).json({ message: 'Trip not found.' });
        }

        return res.status(200).json(updatedTrip);
    } catch (error) {
        return res.status(500).json({ message: 'Unable to update trip.', error: error.message });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
};