const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
var admin = require("firebase-admin");
let myfile;
let loc = __dirname + "/messages.json";
fs.readFile(loc, "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  }
  myfile = JSON.parse(data);
});
let db = admin.firestore();
let message = db.collection("Messages");

// exports.saveText = async (req, res) => {
//   let date = new Date();
//   message
//     .doc()
//     .set({
//       name: req.body.name,
//       email: req.body.email,
//       message: req.body.message,
//       time:
//         date.getHours() +
//         ":" +
//         date.getMinutes() +
//         " on " +
//         ("0" + date.getDate()).slice(-2) +
//         "/" +
//         ("0" + (date.getMonth() + 1)).slice(-2) +
//         "/" +
//         date.getFullYear(),
//       created: admin.firestore.FieldValue.serverTimestamp(),
//     })
//     .then(() => {
//       console.log("messaeg delivered");
//     })
//     .catch((err) => {
//       console.log("could not send messaeg ", err);
//     });
//   return res.status(200).json({
//     text: req.body.name,
//   });
// };

exports.getText = async (req, res) => {
  // let ar = [];
  // const snap = await message.orderBy("created", "asc").limit(120).get();
  // snap.forEach((doc) => {
  //   let d = doc.data();
  //   d["id"] = doc.id;
  //   ar.push(d);
  // });
  fs.readFile(
    loc,
    "utf-8",
    (err, data) => {
      if (err) {
        console.log(err);
      }
      myfile = JSON.parse(data);
      myfile.data.sort((a,b)=>{
        return a.created=b.created;
      })
      return res.status(200).json(myfile.data);
    }
  );
};

exports.saveText = (req, res) => {
  let date = new Date();
  myfile.data.push({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    time:
      date.getHours() +
      ":" +
      date.getMinutes() +
      ", " +
      ("0" + date.getDate()).slice(-2) +
      "/" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      date.getFullYear(),
    created: date.getTime(),
    id: uuidv4(),
  });
  fs.writeFile(
    loc,
    JSON.stringify(myfile),
    "utf-8",
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  return res.status(200).json({ message:'success' });
};

let user;
fs.readFile(__dirname + "/username.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    user = JSON.parse(data);
  }
});
exports.getUser = (req, res) => {
  fs.readFile(__dirname + "/username.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      user = JSON.parse(data);
    }
  });
  return res.json(user);
};
exports.updateUser = (req, res) => {
  console.log(req.body.user);
  let date = new Date();
  fs.writeFile(
    __dirname + "/username.json",
    JSON.stringify({ user: req.body.user,created:req.body.created }),
    "utf-8",
    (err) => {
      if (err) {
        console.log(err);
        return;
      }
    }
  );
  return res.json({ user: req.body.user });
};
