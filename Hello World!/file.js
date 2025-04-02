const fs = require("fs")
const os = require("os")

// fs.writeFileSync("./text.txt","hey there!")

// fs.writeFile("./text.txt", "hey there is async call", (err)=>{})

  // const result = fs.readFileSync("./Contact.txt", "utf-8")
  // console.log(result)
  
  // fs.readFile("./Contact.txt","utf-8",(err,result)=>{
  //   if(err)
  //   {
  //     console.log("Error", err)
  //   }
  //   else{
  //         console.log(result)
  //   }
  // })  


  // fs.appendFileSync("./text.txt",`hey there\n`);
  // fs.copyFileSync("./text.txt","./copy.txt")

  // fs.unlinkSync("./copy.txt")
  // console.log(fs.statSync("./text.txt"))


  console.log(os.cpus().length);
