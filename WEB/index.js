const Express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = Express();

app.use(cors());

const CONNECTION_STRING = "mongodb+srv://admin:admin123@cluster0.vvim7qw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DATABASE_NAME = "todoappdb";
const COLLECTION_NAME = "todoappcollection";
let database;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node JS API Project for mongodb',
            version: '1.0.0'
        },
        servers: [{
            url: 'http://localhost:5038/' // Use 'http' for local development
        }]
    },
    apis: ['./index.js']
};

const swaggerSpecs = swaggerJSDoc(options);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpecs));

/**
 * @swagger
 * /api/todoappdb/GetNotes:
 *   get:
 *     summary: Test if the GET method is working
 *     description: Use this API to check if the GET method is functioning correctly.
 *     responses:
 *       200:
 *         description: Successful response
 */

app.get('/api/todoappdb/GetNotes', (request, response) => {
    if (!database) {
        response.status(500).send("Database connection not established");
        return;
    }
    database.collection(COLLECTION_NAME).find({}).toArray((error, result) => {
        if (error) {
            console.error("Failed to fetch notes:", error);
            response.status(500).send("Failed to fetch notes");
            return;
        }
        response.send(result);
    });
});

app.listen(5038, () => {
    MongoClient.connect(CONNECTION_STRING, (error, client) => {
        if (error) {
            console.error("Failed to connect to MongoDB:", error);
            return;
        }
        database = client.db(DATABASE_NAME);
        console.log("MongoDB connection successful");
    });
});

function updateNotes() {
    if (!database) {
        console.log("Database connection not established");
        return;
    }

    database.collection(COLLECTION_NAME).find({}).toArray((error, documents) => {
        if (error) {
            console.error("Failed to fetch documents:", error);
            return;
        }

        documents.forEach((document) => {
            const newValues = {
                "Temperature": `${Math.floor(Math.random() * 35) + 20}°C`, // Random temperature between 20°C and 55°C
                "Humidity": `${Math.floor(Math.random() * 50) + 50}%`, // Random humidity between 50% and 100%
                "Air Pressure": `${Math.floor(Math.random() * 5) + 1} mph`, // Random air pressure between 1 mph and 5 mph
                "Weather": ["Sunny", "Cloudy", "Rainy", "Windy", "Stormy"][Math.floor(Math.random() * 5)] // Random weather condition
            };

            database.collection(COLLECTION_NAME).updateOne({ _id: document._id }, { $set: newValues }, (error, result) => {
                if (error) {
                    console.error(`Failed to update document with ID ${document._id}:`, error);
                } else {
                    console.log(`Document with ID ${document._id} updated successfully`, result);
                }
            });
        });
    });
}

// Call `updateNotes` every 1 minute (60000 milliseconds)
setInterval(updateNotes, 1000);
