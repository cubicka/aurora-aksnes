const express = require('express');
const path = require('path');
const app = express();


// app.use('/css', express.static(__dirname + '/css'));
// app.use('/img', express.static(__dirname + '/img'));
// app.use('/static', express.static(__dirname + '/static'));
app.use(express.static('./build', {maxAge: 86400000}));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

app.listen(process.env.PORT || 3000);
