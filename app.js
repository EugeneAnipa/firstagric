require("dotenv").config();

//const dotenv = require("dotenv");

const express = require("express");
const bodyParser = require("body-parser");

const mysql = require("mysql");

const app = express();
const axios = require("axios");
const session = require("express-session");

const math = require("mathjs");

var keys = require("object-keys");

var assert = require("assert");

var cookieParser = require("cookie-parser");
app.set("view engine", "ejs");

app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.set("tust proxy", 1);

/*
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

*/

var md5 = require("md5");
/*
var firstagricdb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "firstagricdb",
});

*/
var firstagricdb = mysql.createConnection({
  host: "mysql-sssss-23635.nodechef.com",
  user: "ncuser_7052",
  password: "Ar6IWt3nGp5n2oXAMTN50qfSSVgzOV",
  database: "sssss",
  port: 2394,
});

app.get("/", function (request, respond) {
  respond.render("index");
});

app.post("/", function (request, respond) {});

app.get("/login", function (request, respond) {
  respond.render("login");
});

var Ee = [];
var Pp = [];

app.post("/login", function (request, respond) {
  let Email = request.body.email;
  let Password = md5(request.body.password);
  Ee.push(Email);
  Pp.push(Password);

  var sql1 =
    "SELECT * FROM customers,transactions WHERE email = ? AND password = ? ";

  if (Email === "victorianyarkoh1987@yahoo.com") {
    respond.redirect("signin");
  } else {
    firstagricdb.query(sql1, [Email, Password], function (err, result) {
      // if (err) throw err;

      if (result.length <= 0) {
        respond.redirect("/login");
      } else {
        respond.redirect("/transaction");
      }
    });
  }

  /* 
  firstagricdb.query(sql1, [Email, Password], function (err, result) {
    // if (err) throw err;

    if (result.length <= 0) {
      respond.redirect("/login");
    } else {
      respond.redirect("/transaction");
    }


  });

*/
});

app.get("/signin", function (request, respond) {
  respond.render("signin");
});

app.post("/signin", function (request, respond) {
  let Email = request.body.email;
  let Password = md5(request.body.password);
  Ee.push(Email);
  Pp.push(Password);

  var sql1 =
    "SELECT * FROM customers,transactions WHERE email = ? AND password = ? ";

  if (Email === "victorianyarkoh1987@yahoo.com") {
    respond.render("signin");
  } else {
    respond.redirect("/login");
  }
});

app.get("/transaction", function (request, respond) {
  let Email = Ee[0];
  let Password = Pp[0];

  firstagricdb.connect(function (err) {
    var sql =
      "SELECT firstname,middlename,lastname,email,country,state,address,zipcode,phone,dob,accountnumber FROM customers WHERE email = ? AND password = ?";

    var result1 =
      "SELECT customers.firstname AS firstname,customers.middlename AS middlename,customers.lastname AS lastname,customers.email AS email,customers.country AS country,customers.state AS state,customers.address AS address,customers.zipcode AS zipcode,customers.phone AS phone,customers.dob AS dob,customers.accountnumber AS accountnumber,transactions.id AS id,transactions.amount AS amount,transactions.type AS type,transactions.from_to AS from_to,transactions.description AS description,transactions.balance AS balance,transactions.tdate AS tdate FROM customers INNER JOIN transactions ON customers.accountnumber=transactions.accountnumber WHERE email = ? AND password = ?";

    var sql2 =
      "SELECT customers.firstname,customers.middlename,customers.lastname,customers.email,customers.password,customers.country,customers.state,customers.address,customers.zipcode,customers.phone,customers.dob,customers.accountnumber,transactions.id,transactions.amount,transactions.type,transactions.from_to,transactions.description,transactions.balance,transactions.tdate FROM customers INNER JOIN transactions ON customers.accountnumber=transactions.accountnumber WHERE email = ? AND password = ? ";

    firstagricdb.query(result1, [Email, Password], function (err, result) {
      if (err) throw err;
      console.log(result);

      firstagricdb.query(sql, [Email, Password], function (err, result2) {
        if (err) throw err;
        console.log(JSON.stringify(result2));
        console.log(JSON.stringify(result2.firstname));

        //if (request.session.Email) {

        Object.keys(result2).forEach(function (key) {
          var row = result2[key];
          console.log(row.firstname);

          respond.render("transaction", {
            item: result,
            firstname: row.firstname,
            middlename: row.middlename,
            lastname: row.lastname,
            email: row.email,
            country: row.country,
            state: row.state,
            address: row.address,
            zipcode: row.zipcode,
            phone: row.phone,
            dob: row.dob,
            accountnumber: row.accountnumber,
          });
        });
      });

      //respond.render("transaction", { item: result });
    });
  });
});

app.post("/transaction", function (request, respond) {});

app.get("/signup", function (request, respond) {
  respond.render("signup");
});

app.post("/signup", function (request, respond) {
  let firstname = request.body.firstName;
  let middleName = request.body.middleName;
  let lastName = request.body.lastName;
  let email = request.body.email;
  let country = request.body.country;
  let state = request.body.state;
  let address = request.body.address;
  let zipCode = request.body.zipCode;
  let phoneNumber = request.body.phoneNumber;
  let dob = request.body.dob;
  let new_password = md5(request.body.new_password);
  let accountNumber = Math.floor(Math.random() * 899999 + 100000000000);

  firstagricdb.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
      "INSERT INTO Customers (firstname,middlename,lastname,email,country,state,address,zipcode,phone,dob,password,accountnumber) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";

    firstagricdb.query(
      sql,
      [
        firstname,
        middleName,
        lastName,
        email,
        country,
        state,
        address,
        zipCode,
        phoneNumber,
        dob,
        new_password,
        accountNumber,
      ],
      function (err, result) {
        console.log("1 record inserted");
      }
    );
  });
  respond.render("thankyou");
});

app.get("/logout", function (request, respond) {
  console.log("user logged out");

  respond.redirect("/login");
});

/*

app.get("/forgotpassword", function (request, respond) {
  respond.render("forgotpassword");
});

app.post("/forgotpassword", function (request, respond) {
  respond.redirect("/forgotpassword");
});

app.get("/transaction/settings", function (request, respond) {
  respond.render("settings");
});

app.post("/transaction/settings", function (request, respond) {
  respond.redirect("settings");
});

app.get("/transaction/transfer", function (request, respond) {
  respond.render("transfer");
});

app.post("/transaction/transfer", function (request, respond) {
  respond.redirect("transfer");
});

app.get("/transaction/withdraw", function (request, respond) {
  respond.render("withdraw");
});

app.post("/transaction/withdraw", function (request, respond) {
  respond.redirect("/withdraw");
});


*/

app.listen(process.env.PORT || 3000, function () {
  console.log("server started on port");
});
