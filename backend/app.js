const mongoose = require('mongoose');
const createServer = require('./utils/server');

// Creates instance of server
const app = createServer();

// Uses Mongoose to connect to the MongoDB database
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => {
    console.log('MongoDB connection was successful!');
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err.message);
  });

// Initiates server
app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}!`);
});
