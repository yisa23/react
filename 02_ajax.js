const express = require("express");

const app = express();

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var router = express.Router();
router.get("/hello/:id", function (req, res) {
  console.log(req.params.id, req.query.name);
  res.json({ msg: "hello" });
});
router.post("/test", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

router.get("/jsonp/:fn", (req, res) => {
  res.send(`${req.params.fn}(123)`);
});

router.get("/jsonp2", (req, res) => {
  res.send(`${req.query.callback}(123)`);
});

app.use(router);

app.listen(80);
