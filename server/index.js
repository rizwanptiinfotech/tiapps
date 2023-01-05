const { json } = require("express");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());


// Code to connect SQL Server using Node JS
//==================================================
// app.get("/api/getdata", (req, res) => {
//   //var express = require('express');
//   //console.log(req.body);
//   var sql = require('mssql');
//  // var http = require('http');
//   var config = {
//     user: 'TCSAppDev',
//     password: 'tcsAp@rqxR#t',
//     server: '10.0.50.9', 
//     database: 'DEV_TravelMaster_YTH',
//     options: {
//       // trustedConnection: true,
//       // encrypt: true,
//       // enableArithAbort: true,
//         trustServerCertificate: true,  
//     }   
//     };
//     // connect to your database
//     sql.connect(config, function (err) {

//       if (err) console.log(err);  
//       // create Request object
//       var request = new sql.Request();
//       // query to the database and get the records
//       var lastxmonts=6;
//       var bookingTypes='Tickets';
//       var companyId='YTH';
//       var procqry="exec sp_AvgBookings @months=" + lastxmonts + ", @BookingType='" + bookingTypes + "' ,@CompId='" + companyId + "';";
//      // console.log(procqry);
//      request.query(procqry, function (err, recordset) {

//           if (err) console.log(err);  
//           // send records as a response
//           //obj =JSON.parse(recordset); 
//           //custres = recordset.recordsets[0][0]["ParamKey"] + ' ' + recordset.recordsets[0][0]["ParamValue"];
//           //res.send({message: custres});
//           //res.json(recordset);
//           res.send(JSON.parse(recordset.recordsets[0][0][""]));
//       });
//     });  
// });    


app.get('/',function(req,res) {
  res.send("Hello World");
});


app.post("/api/getgraphdata", (req, res) => {
  //console.log(req.body);
  var sql = require('mssql'); 
  var config;
  if(req.body.companyId==='YTH')
  {
   config = {
    user: 'TCSAppDev',
    password: 'tcsAp@rqxR#t',
    server: '10.0.50.9', 
    database: 'DEV_TravelMaster_YTH',
    options: {      
        trustServerCertificate: true,  
      }   
    };
  }
  else if(req.body.companyId==='FTI')
  {
   config = {
    user: 'TCSAppDev',
    password: 'tcsAp@rqxR#t',
    server: '10.0.50.9', 
    database: 'DEV_TravelMaster_FTI',
    options: {      
        trustServerCertificate: true,  
      }   
    };
  }
  else if(req.body.companyId==='WTT' || req.body.companyId==='SYT' || req.body.companyId==='FTN')
  {
   config = {
    user: 'TCSAppDev',
    password: 'tcsAp@rqxR#t',
    server: '10.0.50.9', 
    database: 'DEV_TravelMaster',
    options: {      
        trustServerCertificate: true,  
      }   
    };
  }

    // connect to your sql database to get the graphic data for jenkins pipeline commit 3 dated on 02 jan 2023
    sql.connect(config, function (err) {

      if (err) console.log(err);  
      // create Request object
      var request = new sql.Request();
      // query to the database and get the records
      var lastxmonts=req.body.noOfMonts;
      var bookingTypes=req.body.bookingTypes;
      var companyId=req.body.companyId;
      var procqry="exec sp_AvgBookings @months=" + lastxmonts + ", @BookingType='" + bookingTypes + "' ,@CompId='" + companyId + "';";
      console.log(procqry);
      request.query(procqry, function (err, recordset) {
          if (err) console.log(err); 
          res.send(JSON.parse(recordset.recordsets[0][0][""]));
          console.log (JSON.parse(recordset.recordsets[0][0][""]));
          sql.close();
      });     
    }); 
});    

// app.post("/api/postdata", (req, res) => {

//   //var express = require('express');
//   console.log(req.body);
//   var sql = require('mssql');
//  // var http = require('http');
//   var config = {
//     user: 'TCSAppDev',
//     password: 'tcsAp@rqxR#t',
//     server: '10.0.50.9', 
//     database: 'DEV_TravelMaster_YTH',
//     options: {
//       // trustedConnection: true,
//       // encrypt: true,
//       // enableArithAbort: true,
//         trustServerCertificate: true,  
//     }   
//     };
//     // connect to your database
//     sql.connect(config, function (err) {

//       if (err) console.log(err);  
//       // create Request object
//       var request = new sql.Request();
//       // query to the database and get the records
//       var compid='YTHH';
//       var keyname='TEST';
//       var keyvalue='TEST';
//       var status=0;
//       var qry="INSERT INTO Company_Settings (CompanyId, ParamKey, ParamValue) VALUES('" + compid + "','" +  keyname + "','" + keyvalue + "')";
//      request.query(qry, function (err, recordset) {

//           if (err) console.log(err);  
//           // send records as a response
//           //obj =JSON.parse(recordset); 
//           //custres = recordset.recordsets[0][0]["ParamKey"] + ' ' + recordset.recordsets[0][0]["ParamValue"];
//           //res.send({message: custres});
//           //res.json(recordset);

//           res.send({message: 'SUCCESS!'});
//       });
//     });  
// }); 

// Code to connect MongoDB using Node JS
//==================================================

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb+srv://mongoadmin:mongoadmin22@cluster0.jwflfab.mongodb.net/myFirstMongoDB?retryWrites=true&w=majority";

//Insert Documents/data in MongoDB Collection
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("myFirstMongoDB");
//   //var myobj = { id:4, Name: "Rida", Hobbies: ["Singing","Traveling","Sleeping"] };
//   var myobj ={   
//     labels: ["Jun 2022","Jul 2022","Aug 2022","Sep 2022","Oct 2022","Nov 2022"],
//     datasets: 
//     [
//      {
//       label: 'Tickets',
//       backgroundColor: 'rgb(255, 99, 132)',
//       borderColor: 'rgb(255, 99, 132)',
//       data: [29,19,20,17,17,13]
//       },
//     ],
//   };
//   dbo.collection("myFirstMongoCOL").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();   
//   });
// });

//Get one document from MongoDB Collection
// app.get("/api/getdata", (req, res) => {
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("myFirstMongoDB");
//   //var query={_id:"6384615ac688ad81dcc402a7"}
//  dbo.collection("myFirstMongoCOL").findOne({},{projection:{ _id: 0}},function(err, result) {
//    // if (err) throw err;
//     //console.log(result);
//     res.send(result);
//     db.close();
//   });
// });
// });


// Get selected property of documents from MongoDB Collection
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("myFirstMongoDB");
//   dbo.collection("myFirstMongoCOL").find({},{ projection: { _id: 0, Name: 1, Hobbies:1 } }).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

// Get filtered by any column from MongodB Collection
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("myFirstMongoDB");
//   var query = { Name: "Rizwan" };
//   dbo.collection("myFirstMongoCOL").find(query).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});