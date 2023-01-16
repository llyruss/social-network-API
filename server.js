const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const routes = require("./routes")



const PORT = process.env.PORT || 3000
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/twitterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
  });

  app.use(routes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})