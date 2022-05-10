var admin = require("firebase-admin");

let db = admin.firestore();

let User = db.collection("Users");

exports.checkUser = async (req, res) => {
  const list = await User.get();
  let f = false;
  list.forEach((doc) => {
    // console.log(doc.data().email," ",req.body.email)
    if (doc.data().email == req.body.email) {
      f = true;
      return res.json({ message: "user already exist" });
    }
  });
  // console.log('naya bakra hai');
  if (!f) {
    res.json({ message: "clean" });
  }
};

exports.registerUser = async (req, res) => {
  User.doc()
    .set({
      name: req.body.name,
      email: req.body.email,
    })
    .then(() => {
      return res.status(200).json({ message: "Success" });
    })
    .catch((err) => {
      return res.status(400).json({ message: "not Success", err });
    });
};
