const express = require("express");
const bodyParser = require("body-parser");
const db = require('./db');
const pushNotify = require('./pushNotify');
var cors = require('cors')
var app = express();
app.use(cors())



app.use(bodyParser.json());

app.get("/zxyvwer/breifs", (req, res) => {
    const { subscriptions } = db.DbFile;
    const obj = {
        totalSubs: Object.keys(subscriptions).length,
        subs: subscriptions
    }
    res.send(obj);
});

// Subscribe Route
app.post("/subscribe", (req, res) => {

    const payload = req.body;
    db.addUpdateSubscription(payload);
    const { pushData } = payload;
    pushNotify.pushNotification(pushData, "Test notification Covid2.in", "You will now recieve real time notification for covid19 India")
    res.send(201)
});

app.put("/location", (req, res) => {

    const payload = req.body;
    db.updateUserLocation(payload);
    res.send(201)
});

app.get("/ping", (req, res) => {
    res.send({ 'test': 'pong' })
});

const port = 5555;
db.initialize().then(() => {
    pushNotify.start()
    app.listen(port, () => {
        console.log(`Server started on port ${port}`)
    });

})