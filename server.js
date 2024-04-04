const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(cors());
/****************connecting to  mysql************************* */
const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "CHIDERA001?.1",
  database: "food_delivery",
  port: "3306",
});
// Creating an endpoint for adding a new resturant
app.post("/resturants", bodyParser.json(), function (req, res) {
  const { name, address } = req.body;
  const sql = `INSERT INTO resturants (name, address) VALUES (?, ?)`;
  con.query(sql, [name, address], function (err, result) {
    if (err) throw err;
    res.send(result)
  });
})
// endpoint for geeting all resturants
app.get("/resturants", bodyParser.json(), function (req, res) {
  const sql = `SELECT * FROM resturants`;
  con.query(sql, (err, result))
  if (err) throw err;
  res.send(result)
})
// endpoint for getting all orders
app.get("/orders", bodyParser.json(), function (req, res) {
  const sql = `SELECT * FROM orders`;
  con.query(sql, (err, result))
  if (err) throw err;
  res.send(result)
});
//creating an endpoint for adding a new order
app.post("/orders", bodyParser.json(), function (req, res) {
  const { restaurant_id, customer_name, order_details } = req.body;
  const sql = `INSERT INTO orders (restaurant_id, customer_name, order_details) VALUES (?,?,?)`;
  con.query(sql, [restaurant_id, customer_name, order_details], function (err, result) {
    if (err) throw err;
    res.send(result)
  })
})
app.listen(4000);
console.log("congratulation your server sha dey run ")