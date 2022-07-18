const express = require("express");
const router = express.Router();
const users = require("../models/SignUpModels");
const bcrypt = require("bcrypt");
router.post("/signup", async (req, res) => {
  const saltPassword = await bcrypt.genSalt();
  const securePassword = await bcrypt.hash(req.body.password, saltPassword);
  const signUpUser = new users({
    fullName: req.body.fullName,
    username: req.body.username,
    email: req.body.email,
    password: securePassword,
  });
  signUpUser
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.get("/getdata", async (req, res) => {
  const resp = await users.find();
  res.json(resp);
});
router.put("/updateData/:id", async (req, res) => {
  console.log(req.params.id, "vllllllllllllllll");
  const data = {
    fullName: req.body.fullName,
    username: req.body.username,
    email: req.body.email,
  };
  const result = await users.updateOne({ _id: req.params.id }, data);
  console.log("==========>", result);
  res.json(result);
});
router.delete("/del/:id", async (req, res) => {
  const resp = await users.deleteOne({ _id: req.params.id });
  res.json(resp);
  // const res=await
});
module.exports = router;
