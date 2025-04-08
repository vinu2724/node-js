const express = require("express");

const { mongoConnect } = require("./connection");
const { logReqRes } = require("./middlewares");
const userRouter = require("./routes/user");
const app = express();
const PORT = 8000;

mongoConnect("mongodb://127.0.0.1:27017/firstDb").then(() => {
  console.log("mongoDb Connected");
});

app.use(express.urlencoded({ extended: true }));

app.use(logReqRes("log.txt"));

app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`server started at PORT : ${PORT} `));
