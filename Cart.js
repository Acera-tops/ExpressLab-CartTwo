const express = require('express');
const cart = express.Router();//creating cart object that were adding functionality to

const cartItems = [
    {
    id:1,
    product:"Book",
    price:14.99,
    quantity:3
    },
    {
    id:2,
    product:"50 Candles",
    price:10.99,
    quantity:1
    },
    {
    id:3,
    product:"Incense",
    price:14.95,
    quantity:2
    },
    {
    id:4,
    product:"Vinyl Album",
    price:20.00,
    quantity:3
    },
    {
    id:5,
    product:"T-Rex Costume",
    price:49.99,
    quantity:1
    }
]

//main logic from endpoint
cart.get("/", (req,res) => {
// Query string parameters: the request may have one of the following or it may have none. (See tests below for examples.)
    // i. maxPrice - if specified, only include products that are at or below this price.
    const maxPrice = req.query.maxPrice;
    let rtnItems = cartItems;
    if (maxPrice){
        rtnItems = cartItems.filter((rtnItem) =>{
            return rtnItem.price < maxPrice;
        });
    };

    // ii. prefix - if specified, only includes products that start with the given string in the response array.
    const prefix = req.query.prefix;
    if(prefix){
        //filter by product string
        rtnItems = cartItems.filter((rtnItem)=>{
            return rtnItem.product.includes(prefix);
        });
    };


    // iii. pageSize - if specified, only includes up to the given number of items in the response array. For example, if there are ten items total, but pageSize=5, only return an array of the first five items.
    const pageSize = req.query.pageSize;
    if (pageSize){
        rtnItems = cartItems.slice(0, parseInt(pageSize));
    };

    res.status(200);
    res.json(rtnItems);

});

cart.get("/:id", (req,res) =>{
    const id = req.params.id;
    if(id){
        //filter by id
        const item = cartItems.filter((item)=>{
            return item.includes(id);
        })
        res.json(id);
    } else{
        res.status(404);
        res.json("ID Not Found");
    }
});


cart.post("/", (req, res) => {
    let newItem = {
        id: req.body.id,
        product:req.body.distance,
        price:req.body.price,
        quantity:req.body.quantity
        }
    cartItems.push(newItem);
    res.status(201);
    res.json(cartItems);
  });



cart.put("/:id", (req, res) => {
    //go through all items and find the id that we passed in
    const index = cartItems.findIndex((i)=> i.id === parseInt(req.params.id));
    items[index].product = req.body.distance,
    items[index].price = req.body.price,
    items[index].quantity = req.body.quantity
    //Logic to update item
    cartItems.splice(index, 1, req.body)
    res.status(200);
    res.json(cartItems);
});


cart.delete("/:id", (req, res) => {
    //make string into integer
    const id = parseInt(req.params.id);
    //go through all items and find the id that we passed in
    const index = cartItems.findIndex((i)=> i.id === id);
    //Logic to remove item
    cartItems.splice(index, 1);
    res.status(204);
    res.json(cartItems);
  });

module.exports = cart;