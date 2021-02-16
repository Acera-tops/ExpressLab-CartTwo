// require the Express module
const express = require("express");
//import and use the cart route in our app
const cart = require('./cart');
// creates an instance of an Express server
const app = express();
// define the port
const port = 3005;

//whenever you go to /cart it'll render "cart"
app.use("/cart/", cart);//this is the URI aka path

// run the server
app.listen(port, () => console.log(`Listening on
port: ${port}.`));

console.log("http://localhost:" + port + "/cart");

