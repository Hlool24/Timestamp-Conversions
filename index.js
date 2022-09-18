// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Time stamp API

app.get(`/api/:date?`,(req,res) =>{
 
  let data=req.params.date;
  
  const regex2=/[0-9]{10,13}/;

  if(regex2.test(data)){
    const date2= new Date(parseInt(data))
    const UTC = date2.toUTCString();
  res.status(200).json({"unix":parseInt(data),"utc":`${UTC}`})
  }
  else if(data == undefined){
    const date1 = new Date();
    const UTC=date1.toUTCString();
    const unix=date1.getTime();
    res.status(200).json({"unix":unix,"utc":`${UTC}`})
  }
  else if(new Date(data)== 'Invalid Date'){
    res.status(400).json({"error":"invalid Date"})
  }
  else{
    const date1 = new Date(data);
    const UTC=date1.toUTCString();
    const unix=date1.getTime();
    res.status(200).json({"unix":unix,"utc":`${UTC}`})
  }
  
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
