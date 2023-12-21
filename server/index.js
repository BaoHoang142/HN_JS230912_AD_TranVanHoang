var express = require("express");
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const cors = require("cors");
app.use(cors({
    origin: "*"
}));
const todosRouter = require("./src/router/todo.Routes")
//Su dung router
app.use("/api/v1/todos", todosRouter )
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});