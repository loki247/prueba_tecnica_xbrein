const express = require('express')
const bodyParser = require("body-parser");
const routes = require("./route/index");
const dotenv = require('dotenv');
const cors = require('cors')


const app = express()
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

routes(app);

dotenv.config();

app.use((req, res) => {
    res.status(404).send("NOT FOUND");
});

app.listen(port, () => {
   console.log("Puerto:", port)
});