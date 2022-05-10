const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
let cors=require('cors');
var admin = require("firebase-admin");

var serviceAccount = require("/Users/namanbansal/Desktop/lestChat/letschat-4622a-firebase-adminsdk-s25nm-5b0cac28df.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", "./views");
const port = 8000;

app.use("/api", require("./routes/mailer"));
app.use("/api", require("./routes/messages"));
app.use('/api', require("./routes/user"));

app.listen(port, () => {
  console.log("server is up and running");
});
