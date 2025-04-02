const express = require("express");

const app = express();

app.get('/', (req,res)=>{
return res.send("hello its home page")
})

app.get('/about', (req,res)=>{
  return res.send("welcome to about page" + ' hey ' + req.query.name + ' your id : '  + req.query.id)
})

// function myHandler(req,res){
//   if(req.url==="/favicon.ico") return res.end();
//   const log = `${Date.now()} :  ${req.url} New req received `
//   const myUrl = url.parse(req.url,true)
//   console.log(myUrl)
//   fs.appendFile("./logs.txt", `${log}\n`, (err, data)=>{
//    switch(myUrl.pathname){
//      case '/': res.end("this is home page");
//      break
//      case '/about': 
//      const username = myUrl.query.name;
//      res.end( `hi ${username}`)
//      break
//      case '/search': 
//      const search = myUrl.query.search_query;
//      res.end( " here are your result for the serach: " + search)
//      break
     
//      default: res.end("404 Page not found")
//    }
   

//   })
//  console.log("new req received")

// }



app.listen(8000, ()=>{
   console.log("server started!")

})