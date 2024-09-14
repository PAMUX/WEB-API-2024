const TrainLocation = require('../models/TrainLocation');

// Add train location
exports.addTrainLocation = async (req, res) => {
  const { trainId, latitude, longitude } = req.body;

  try {
    const newLocation = new TrainLocation({ trainId, latitude, longitude });
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get train locations
exports.getTrainLocations = async (req, res) => {
  try {
    const locations = await TrainLocation.find().sort({ timestamp: -1 });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get specific train location
exports.getTrainLocationById = async (req, res) => {
  try {
    const location = await TrainLocation.findById(req.params.id);
    if (!location) return res.status(404).json({ message: 'Location not found' });

    res.json(location);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
