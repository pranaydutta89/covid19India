var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());

app.use(express.static(__dirname));
app.listen(3000, () => {
  console.log('server is running on port 3000');
});
