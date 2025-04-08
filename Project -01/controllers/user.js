const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const user = await User.find({});
  return res.json(user);
}

async function hangleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(400).json({ Status: "failed" });

  return res.json(user);
}

async function handleUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: "change" });
  return res.json({ Status: "success" });
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  res.json({ Status: "user deleted" });
}

async function handleCreateNewUser(req, res) {
  // todo : Create new user
  const body = req.body;
  // if(!body || body.first_name || body.last_name || body.email || body.gender || body.job_title){
  //   res.status(400).json({Status : "Bad Req" , Message : "Data is Missing"})
  // }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  console.log("user", result);

  return res.status(201).json({ Status: "success" });
}

module.exports = {
  handleGetAllUsers,
  hangleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
