const express = require('express');
const users = require('./MOCK_DATA.json')
const app = express();
const PORT = 8000;
const mongoose = require("mongoose")
const fs = require("fs");
const { type } = require('os');

const userSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: true,
  },
  lastName: {
    type: String,

  },
  email:{
    type: String,
    required: true,
    unique: true,
  }

})

app.use(express.urlencoded({extended: true}))

app.use((req,res,next)=>{
  console.log("hello from middleware 1")
next()
})

//routes
app.get('/users', (req,res)=>{
  const html =`
  <ul>
      ${users.map((user)=>`<li>${user.first_name} </li>`).join("")}
  </ul>
  `;
  res.send(html)

})

app.get("/",(req,res)=>{
  return res.send("hello this is home page")
})

app.get('/api/users',(req,res)=>{
  return res.json(users);
})

app.route("/api/users/").get((req,res)=>{
  const id = Number(req.params.id); 
  const user = users.filter(user => user.id===id)
  res.send(user)
}).delete((req,res)=>{
  //todo : delete the user with id 
  res.json({status: "pending"})
})

app.get("/api/users/:id", (req,res)=>{
  const id = Number(req.params.id); 
  console.log(id)
  const user = users.filter(user => user.id===id)
  console.log(user)
  if(user.length=== 0) return res.status(404).json({Message: "User Not Found"})
  res.send(user)
}
)
app.post("/api/users/", (req,res)=>{
  // todo : Create new user
  const body = req.body;
  if(!body || body.first_name || body.last_name || body.email || body.gender || body.job_title){
    res.status(400).json({Status : "Bad Req" , Message : "Data is Missing"})
  }
  users.push({...body, id: users.length +1})
  fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err)=>{
   if(err){
    return res.status(500).json({Status : "Error", Message : "failed to write file"})
    
   }
    return res.status(201).json({Status : "Success", id: users.length+1})
  })
})

app.delete("/api/users/", (req, res) => {
  const id = Number(req.params.id);
  const index = users.filter(obj => obj.id === id);
  console.log(index)
  if (index !== -1) {
    users.splice(index, 1);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
      if (err) {
        return res.status(500).json({ Status: "Error", Message: "Failed to write data" });
      }
      res.json({ Status: "Success", users });
    });
  } else {
    res.status(404).json({ Status: "Error", Message: "User not found" });
  }
});

app.patch("/api/users/", (req, res) => {

  console.log(req.body)

  const id = Number(req.body["id "]?.trim?.() || req.body.id?.trim?.());
  console.log(id)

  const { key, value } = req.body;

  const index = users.findIndex(obj => obj.id === id);
  if (index === -1) {
    return res.status(404).json({ Status: "Error", Message: "User not found" });
  }

  users[index][key] = value;

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      return res.status(500).json({ Status: "Error", Message: "Failed to write file" });
    }
    return res.json({ Status: "Success", users });
  });


});



app.listen(PORT,()=>console.log(`server started at PORT : ${PORT} ` ));
