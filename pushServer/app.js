const express = require("express");
const bodyParser = require("body-parser");
const db = require('./db');
const pushNotify = require('./pushNotify');
var cors = require('cors')
var app = express();
app.use(cors())



app.use(bodyParser.json());


// Subscribe Route
app.post("/subscribe", (req, res) => {

    const payload = req.body;
    db.addUpdateSubscription(payload);
    res.send(201)
});

app.put("/location", (req, res) => {

    const payload = req.body;
    db.updateUserLocation(payload);
    res.send(201)
});

const port = 5000;
db.initialize().then(() => {
    pushNotify.start()
    app.listen(port, () => {
        console.log(`Server started on port ${port}`)
    });

})