const express = require('express');
const users = require('./MOCK_DATA.json')
const app = express();
const PORT = 8000;

//routes
app.get('/users', (req,res)=>{
  const html =`
  <ul>
      ${users.map((user)=>`<li>${user.first_name} </li>`).join("")}
  </ul>
  `;
  res.send(html)
  console.log(req)
})



app.get('/api/users',(req,res)=>{
  return res.json(users);
})

app.route("/api/users/:id").get((req,res)=>{
  const id = Number(req.params.id); 
  const user = users.filter(user => user.id===id)
  res.send(user)
}).patch((req,res)=>{
  //edit the user with id
  res.json({status:"pending"})
}).delete((req,res)=>{
  //todo : delete the user with id 
  res.json({status: "pending"})
})

app.get("/api/users/:id", (req,res)=>{
  const id = Number(req.params.id); 
  const user = users.filter(user => user.id===id)
  res.send(user)
}
)
app.post("/api/users/:id", (req,res)=>{
  // todo : Create new user
  res.send({Status : "pending"})
})

app.patch("/api/users/:id",(req, res)=>{
  //todo : edit the user with id
  return res.send({status: "pending"})

})


app.listen(PORT,()=>console.log(`server started at PORT : ${PORT} ` ));
