const express = require('express');
const router = express.Router();
const db = require("../data/db");


router.use("/foods/:id", async function (req, res) {

    try {
    const [result, ] = await db.execute("SELECT * FROM foods WHERE id=" + req.params.id);
    res.render("food-details", {
      foods:result
    });
  } catch (error) {
    console.log(error);
  }
});

router.use("/foods", async function (req, res) {
  db.execute("SELECT * FROM foods")
    .then((result) => {
      res.render("foods", { foods: result[0] });
    })
    .catch((err) => console.log(err));
});

router.use("/", async function (req, res) {
  try {
    const [result] = await db.execute("SELECT * FROM foods");
    res.render("home", {
      foods: result,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
