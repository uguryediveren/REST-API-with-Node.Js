var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
require("dotenv/config");

var urlEncodedParser = bodyParser.urlencoded({ extended: false });

var Product = require("./models/Product");

var port = process.env.PORT || 8080;
var url = process.env.URL;

mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(err) {
    if (err) console.log(err);

    console.log("veritabanına baglanildi");
  }
);

var app = express();

app.use(express.json());

app.post("/stocks", urlEncodedParser, function(request, response) {
  var product_id = request.body.product_id;
  var name = request.body.name;
  var stock = request.body.stock;
  var created_date = request.body.created_date;

  var product = new Product({
    product_id,
    name,
    stock
  });

  product
    .save()
    .then(prod => {
      response.json({
        code: 0,
        msg: "Urun eklendi",
        data: prod
      });
    })
    .catch(error => {
      let err = {};

      for (let key of Object.keys(error.errors)) {
        err[key] = error.errors[key].name;
      }

      response.json({
        code: 404,
        message: err
      });
    });
});

app.get("/stocks", function(request, response) {
  Product.find().then(products => {
    response.json({
      code: 0,
      msg: "success",
      data: products
    });
  });
});

app.listen(port, function() {
  console.log("server calisti");
});
