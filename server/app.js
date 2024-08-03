const express = require('express');
const {connectToMongoDB} = require('./connect');
const urlRoute = require('./routes/url');
const getRoute = require('./routes/dynamic');
const analyticsRoute = require('./routes/analytics');
const cors = require('cors');
require('dotenv').config();

var corsOptions = {
    origin: 'https://uc-wheat.vercel.app',
}

const app = express();
const PORT = 8000;

app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/url", urlRoute);
app.use("/", getRoute);
app.use("/analytics",analyticsRoute);

connectToMongoDB(process.env.DB_URL).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})

module.exports = app;