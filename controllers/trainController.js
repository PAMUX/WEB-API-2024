const TrainLocation = require('../models/TrainLocation');

/**
 * @swagger
 * /locations:
 *   post:
 *     summary: Add a new train location
 *     description: Add a new train location to the database
 *     tags: [TrainLocation]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trainId:
 *                 type: string
 *               latitude:
 *                 type: number
 *                 format: float
 *               longitude:
 *                 type: number
 *                 format: float
 *             example:
 *               trainId: "12345"
 *               latitude: 6.927079
 *               longitude: 79.861244
 *     responses:
 *       201:
 *         description: Train location added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainLocation'
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /locations:
 *   get:
 *     summary: Get all train locations
 *     description: Retrieve a list of all train locations sorted by timestamp
 *     tags: [TrainLocation]
 *     responses:
 *       200:
 *         description: A list of train locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrainLocation'
 *       500:
 *         description: Server error
 */
exports.getTrainLocations = async (req, res) => {
  try {
    const locations = await TrainLocation.find().sort({ timestamp: -1 });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @swagger
 * /locations/{id}:
 *   get:
 *     summary: Get a specific train location by ID
 *     description: Retrieve a specific train location by its ID
 *     tags: [TrainLocation]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the train location
 *     responses:
 *       200:
 *         description: A specific train location
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainLocation'
 *       404:
 *         description: Location not found
 *       500:
 *         description: Server error
 */
exports.getTrainLocationById = async (req, res) => {
  try {
    const location = await TrainLocation.findById(req.params.id);
    if (!location) return res.status(404).json({ message: 'Location not found' });

    res.json(location);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
