import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import axios from "axios";

const router = express.Router();


let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://api.getdrip.com/v2/9967522/subscribers/',
  headers: { 
    'Authorization': 'Basic MDY3MmRjNTIyZDNiNjgyN2U0MDY1YzI4NjZiNTkwMjI6',
    'Content-Type': 'application/json'
  }
};

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("records");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.get("/subscribers", async (req, res) => {
  var result = [];
  await axios.request(config)
  .then((response) => {
      result = response.data
      res.send(result);
  })
  .catch((error) => {
  console.log(error);
  });
//console.log(records)
//console.log("working get request")
console.log(result)

});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("records");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  let newDocument = {
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  };
  let collection = await db.collection("records");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level
    }
  };

  let collection = await db.collection("records");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("records");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;