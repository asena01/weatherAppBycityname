const sslRedirect = require('heroku-ssl-redirect');
const express = require ('express');
const app = express();
const path = require('path');
app.use(sslRedirect());
app.use(express.static(__dirname + '/dist/weatherApp'));
app.listen(process.env.PORT || 5000);


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/weatherApp/index.html'))
});
