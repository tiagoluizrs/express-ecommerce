const express = require('express');

const app = express();
const db = require('./db.js');

require("dotenv").config();

// Rotas
const user = require('./routes/user');
const auth = require("./routes/auth"); 
const product = require("./routes/product"); 
const category = require("./routes/category"); 

app.use(express.json());

app.use("/user", user);
app.use("/auth", auth);
app.use("/product", product);
app.use("/category", category);

db.sync(() => console.log("Banco de dados rodando"));
app.listen(process.env.PORT, function () {
  console.log("Aplicação rodando.");
});