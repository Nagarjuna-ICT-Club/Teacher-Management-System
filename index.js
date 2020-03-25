const app = require("express")();
const http = require("http");

require("dotenv").config();

// parse the json formats
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// show the requests
app.use(require("morgan")("dev"));

// cross request resolver
app.use(require("cors")());

// uncomment this when using globally
// require('mongoose').connect(`mongodb+srv://sangya2058:${process.env.MONGODB_KEY}@nagarjuna-teacher-management-yypwi.mongodb.net/test?retryWrites=true&w=majority`, (err) => {
require("mongoose").connect(
  `mongodb://localhost/nagarjuna-teacher-management`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) return console.log(err);
    else console.log("Database: Connected => Nagarjuna-Teacher-Management");
  }
);

app.use("/api/teacher/assignments", require("./routes/assignment"));

// unknown request
app.use((req, res) => {
  res.status(404).json({
    msg: "404 API not found!"
  });
});

const PORT = process.env.PORT || 1999;
http.createServer(app).listen(PORT, () => {
  console.log(`Server: Running => ${PORT}`);
});
