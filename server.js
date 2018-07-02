// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:date_string?", (req, res) => {
  const value = req.params.date_string;
  if(req.params.date_string == null) {
     res.json({"unix": new Date().getTime() / 1000 , "utc": new Date().toUTCString()});
  } else if(isNaN(req.params.date_string)) {
     res.json({"unix": new Date(req.params.date_string).getTime() / 1000, "utc": new Date(req.params.date_string).toUTCString()});
  } else {
     res.json({"unix": req.params.date_string, "utc": new Date(req.params.date_string * 1000).toUTCString()});
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});