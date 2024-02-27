const { Router, response } = require("express");
const router = Router();
const List = require("../models/List");

router.get("/trips", async (req, res) => {
  try {
    const { googleId } = req.query; 
    console.log(googleId)
    const query = { googleId };
    const lists = await List.find(query);
    res.json(lists);
  } catch (error) {
    console.error("Error fetching lists:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/addTrip", async (req, res) => {
  try {
    const newList = new List(req.body);
    const savedList = await newList.save();
    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error creating list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
