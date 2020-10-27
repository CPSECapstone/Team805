const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const jsonData = require('./sample.json');
const app = express();
const port = 3000;

app.use(cors());
let jsonParser = bodyParser.json()
let session = false;

// Track all pushed data
let records = [];

// User submits a form
app.post('/submit', jsonParser, (req, res) => {

    // User must be logged in to submit a form
    if (!session) {
        res.status(400).send("User must be logged in!");
        return;
    }

    // Validate schema while building a record
    let record = {};
    for (let field of jsonData.fields) { 
        if (!(field.field_name in req.body)) {
            res.status(400).send("Submitted data does not match schema");
            return;
        }
        record[field.field_name] = (req.body[field.field_name]);
    }
    records.push(record);
    res.json(records);
});

// User accesses a form
app.post('/login', jsonParser, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        res.json(jsonData);
        session = true;
    }
    else {
        res.status(400).send("Login missing username or password")
    }
})

app.listen(port, () => console.log(`Vendor api listening on port ${port}!`));