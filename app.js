
const express = require('express')
const app = express()
const port = 3000

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   const myObj = { 
//     retailer: "Officeworks", 
//     store: "Dee Why", 
//     location: [-25.363, 131.044],
//     status: 1
//   };
//   dbo.collection("retailers").insertOne(myObj, (err, res) => {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
// });

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

app.post('/update', (req, res) => {
  const params = req.body;
  console.log(params)

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("retailers").updateOne(
      {_id: params.id}, 
      {
        $set: { status: params.status },
        $currentDate: { lastModified: true }
      });
  });
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})