const express = require('express');
const path = require('path');
const app = express();


// app.use('/css', express.static(__dirname + '/css'));
// app.use('/img', express.static(__dirname + '/img'));
// app.use('/static', express.static(__dirname + '/static'));
app.use(express.static('./build'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

app.listen(3000);
console.log('listen to 9000');