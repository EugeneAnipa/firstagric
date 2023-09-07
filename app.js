require("dotenv").config();

//const dotenv = require("dotenv");

const express = require("express");
const bodyParser = require("body-parser");

const mysql = require("mysql");

const app = express();
const axios = require("axios");
const session = require("express-session");

var keys = require("object-keys");

var assert = require("assert");

var multer = require("multer");

var upload = multer();

var cookieParser = require("cookie-parser");
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(upload.array());
app.use(cookieParser());

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

//app.use(session({ secret: "Your Secret Key" }));

//const MySQLStore = require("express-mysql-session")(session);
//app.use(require("flash")());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

var md5 = require("md5");
/*
const passport = require("passport");
const LocalStrategy = require("passport-local");

app.use(passport.initialize());

app.use(passport.session());  */
/* back  
function checkSignIn(request, respond) {
  if (request.session.user) {
    respond.render("transaction");
  } else {
    var err = new Error("Not logged I!n");
    console.log(request.session.id, "you");
    // next(err);
  }
}
      */
var firstagricdb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "firstagricdb",
});

/*
const options = {
  connectionLimit: 10,
  password: "",
  user: "root",
  database: "firstagricdb",
  host: "local",
  createDatabaseTable: true,
};

const pool = mysql.createPool(options);

const sessionStore = new MySQLStore(options);

app.use(
  session({
    name: "log",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    secret: "log",
    cookie: {
      maxAge: 60 * 1,
      sameSite: true,
    },
  })
);   */

//LocalStrategy = require("passport-local").Strategy;
/*
passport.use(
  new LocalStrategy(function verify(Email, Password, cb) {
    firstagricdb.get(
      "SELECT * FROM Customers WHERE email = ? AND password = ?",
      [Email, md5(Password)],
      function (err, user) {
        if (err) {
          return cb(err);
        }
        if (!user) {
          return cb(null, false, {
            message: "Incorrect username or password.",
          });
        }
      }
    );
  })
);
*/

app.get("/", function (request, respond) {
  respond.render("index");
});

app.post("/", function (request, respond) {
  //respond.render("index");
});

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

  var sess = request.session;

  var sql1 =
    "SELECT * FROM Customers,transactions WHERE email = ? AND password = ? ";
  /*
  var sql2 =
    "SELECT customers.firstname,customers.middlename,customers.lastname,customers.email,customers.password,customers.country,customers.state,customers.address,customers.zipcode,customers.phone,customers.dob,customers.accountnumber,transactions.id,transactions.amount,transactions.type,transactions.from_to,transactions.description,transactions.balance,transactions.date FROM customers INNER JOIN transactions ON customers.accountnumber=transactions.accountnumber WHERE email = ? AND password = ? "; 
    */

  firstagricdb.query(sql1, [Email, Password], function (err, result) {
    if (result.length <= 0) {
      respond.redirect("/login");
    } else {
      //respond.render("transaction");
      respond.redirect("/transaction");
      // passport.authenticate("local");
      // request.session.user = Email;
      // respond.redirect("/transaction");
      /*
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        console.log(row.title);

        respond.render("transaction", {
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

          tid: row.id,
          tamount: row.amount,
          ttype: row.type,
          tfrom_to: row.fron_to,
          tdescription: row.description,
          tbalance: row.balance,
          tdate: row.tdate,
        });
      });                  */
    }
  });

  //respond.redirect("/login");
});

app.get(
  "/transaction",
  /* checkSignIn,*/ function (request, respond) {
    let Email = Ee[0];
    let Password = Pp[0];

    // respond.render("transaction", { id: request.session.user.id });
    /*
  if (request.isAuthenticated()) {   */
    firstagricdb.connect(function (err) {
      //if (err) throw err;
      //var ID = "";
      var sql = "SELECT * FROM Customers";
      var result1 =
        "SELECT firstname,middlename,lastname,email,country,state,address,zipcode,phone,dob,accountnumber FROM Customers ORDER BY id DESC LIMIT 1";

      var sql2 =
        "SELECT customers.firstname,customers.middlename,customers.lastname,customers.email,customers.password,customers.country,customers.state,customers.address,customers.zipcode,customers.phone,customers.dob,customers.accountnumber,transactions.id,transactions.amount,transactions.type,transactions.from_to,transactions.description,transactions.balance,transactions.tdate FROM customers INNER JOIN transactions ON customers.accountnumber=transactions.accountnumber WHERE email = ? AND password = ? ";

      firstagricdb.query(result1, [Email, Password], function (err, result) {
        if (err) throw err;
        //console.log(result);

        Object.keys(result).forEach(function (key) {
          var row = result[key];
          //console.log(row.firstname, row.type, row.amount, row.id);

          respond.render("transaction", {
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
            /*
            tid: row.id,
            tamount: row.amount,
            ttype: row.type,
            tfrom_to: row.from_to,
            tdescription: row.description,
            tbalance: row.balance,
            tdate: row.tdate,            */
          });
        });
      });
    });
    // } else {
    //  respond.render("login");  back
    //}

    /*

  firstagricdb.connect(function (err) {
    //if (err) throw err;

    var sql = "SELECT * FROM Customers";
    var result1 =
      "SELECT firstname,middlename,lastname,email,country,state,address,zipcode,phone,dob,accountnumber FROM Customers ORDER BY id DESC LIMIT 1";

    firstagricdb.query(result1, function (err, result) {
      if (err) throw err;

      Object.keys(result).forEach(function (key) {
        var row = result[key];
        console.log(row.title);

        respond.render("transaction", {
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
  });

  */
  }
);

app.post("/transaction", function (request, respond) {
  //respond.redirect("/transaction");
});
/*  back, i think you have to look for the next fxn 
app.use("/transaction", function (err, request, respond, next) {
  console.log(err);
  respond.redirect("/transaction");
});       */
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
        //if (err) throw err;
        console.log("1 record inserted");
      }
    );
  });
  respond.render("thankyou");
  //redirect to homepage after saying thank you respond.redirect("/index")
  //respond.redirect("/signup");
  //request.flash("thank you");
});
/* back  */

app.get("/transactionsummary", function (resquest, respond, next) {
  let Email = Ee[0];
  let Password = Pp[0];

  var sql2 =
    "SELECT customers.firstname,customers.middlename,customers.lastname,customers.email,customers.password,customers.country,customers.state,customers.address,customers.zipcode,customers.phone,customers.dob,customers.accountnumber,transactions.id,transactions.amount,transactions.type,transactions.from_to,transactions.description,transactions.balance,transactions.tdate FROM customers INNER JOIN transactions ON customers.accountnumber=transactions.accountnumber WHERE email = ? AND password = ? ";

  var sql3 =
    "SELECT customers.email,customers.password,transactions.id AS id ,transactions.amount AS amount,transactions.type AS type,transactions.from_to AS from_to,transactions.description AS description,transactions.balance AS balance,transactions.tdate AS tdate FROM customers INNER JOIN transactions ON customers.accountnumber=transactions.accountnumber WHERE email = ? AND password = ? ";

  firstagricdb.query(sql3, [Email, Password], function (err, result) {
    if (err) {
      throw err;
    } else {
      respond.render("transactionsummary", { item: result });
    }
  });
});

app.get("/logout", function (request, respond) {
  //request.session.destroy(function (err) {
  //respond.redirect("/login");
  // });
  //respond.redirect("/index");

  request.session.destroy(function () {
    console.log("user logged out");
  });
  respond.redirect("/login");
});

app.post("/logout", function (request, respond) {
  //respond.render("logout");
  /*
    request.session.destroy(function (err) {
    if (err) {
      return respond - redirect("/index");
    }
    sessionStore.close();
    respond.clearCookie("log");
    respond.redirect("/login");
  });   */

  request.logout();
  respond.redirect("/index");
});
app.get("/forgotpassword", function (request, respond) {
  respond.render("forgotpassword");
});

app.post("/forgotpassword", function (request, respond) {
  respond.redirect("/forgotpassword");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("server started on port");
});
