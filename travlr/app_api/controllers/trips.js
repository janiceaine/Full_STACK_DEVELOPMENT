import mongoose from 'mongoose';
import Trip from '../models/travlr';
const Model = mongoose.model('trips');

// GET all /trips - list all the trips
const tripsList = async (req, res) => {
    const q = await Model.find({}).exec();

    if (q.length === 0) {
        return res.status(404).json({ message: "No trips found" });
    } else {
        return res.status(200).json(q);
    }
};

// GET: /trips/:tripCode - lists a single trip
const tripsFindByCode = async (req, res) => {
    const q = await Model.find({ 'code': req.params.tripCode }).exec();

    if (q.length === 0) {
        return res.status(404).json({ message: "Trip not found" });
    } else {
        return res.status(200).json(q);
    }
};

// GET User (similar to getAuthor)
const getUser = (req, res, callback) => {
    if (req.auth && req.auth.email) {
        callback(req.auth.email);
    } else {
        return res.status(401).json({ message: "Unauthorized user" });
    }
};

// POST: /trips - Add a new trip
const tripsAddTrip = async (req, res) => {
    getUser(req, res, (user) => {
        Trip.create(
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description,
                createdBy: user // Add user who created the trip
            },
            (err, trip) => {
                if (err) {
                    return res.status(400).json(err); // Bad request
                } else {
                    return res.status(201).json(trip); // Successfully created
                }
            }
        );
    });
};
const tripsUpdateTrip = async (req, res) => {
    getUser(req, res, (req, res) => {
        Trip.findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true }
        )
        .then(trip => {
            if (!trip) {
                return res
                    .status(404)
                    .send({
                        message: "Trip not found with code " + req.params.tripCode
                    });
            }
            res.send(trip);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res
                    .status(404)
                    .send({
                        message: "Trip not found with code " + req.params.tripCode
                    });
            }
            return res
                .status(500) // server error
                .json(err);
        });
    });
};
export {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};