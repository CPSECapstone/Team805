const express = require('express');
const app = express();

app.post('/', (req, res) => {
  return res.send(`Capstone POST received. 
    Payload was: ${req.headers['message']}`);
});

app.listen(5000, () =>
  console.log('API started on port 5000'));
