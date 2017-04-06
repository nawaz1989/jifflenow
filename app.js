var express = require('express');

var app = express();
var PORT = 8081;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(PORT);

console.log('Listening to port 8081');