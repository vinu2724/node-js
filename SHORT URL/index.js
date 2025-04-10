const express = require("express");
const App = express();
const urlRoute = require("./routes/url");
const PORT = 8001;
const URL = require("./models/url");
const { connectToMongoDB } = require("./connect");

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("mongo connected");
});
App.use(express.json());
App.use("/url", urlRoute);

App.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  console.log(shortId);
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(entry.redirectURL);
});

App.listen(PORT, () => {
  console.log(`server started at : ${PORT}`);
});
