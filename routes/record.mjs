import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import axios from "axios";
import { Routes, Route, useParams } from 'react-router-dom';

const router = express.Router();

var subs = []

let page = 1
var pageCount = 0
var result = [];
var returnResult = []

router.get("/subscribers", async (req, res) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api.getdrip.com/v2/9967522/',
    headers: { 
      'Authorization': 'Basic MDY3MmRjNTIyZDNiNjgyN2U0MDY1YzI4NjZiNTkwMjI6',
      'Content-Type': 'application/json'
    }
  };

  
    config.url = config.url + "/subscribers"
    result = await axios.request(config)
    .then((response) => {
      
      result = JSON.stringify(response.data.subscribers)  
      pageCount = response.data.meta.total_pages
      
      returnResult.push(JSON.parse(result))
      console.log(returnResult)
      res.send(returnResult);


    })
    .catch((error) => {
    console.log(error);
    });
  
});

router.get("/subscribers/:sub", async (req, res) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api.getdrip.com/v2/9967522/',
    headers: { 
      'Authorization': 'Basic MDY3MmRjNTIyZDNiNjgyN2U0MDY1YzI4NjZiNTkwMjI6',
      'Content-Type': 'application/json'
    }
  };
  let subID = req.params
  console.log(subID)
  config.url = config.url + '/subscribers/' + subID.sub
  result = await axios.request(config)
  .then((response) => {
    
    result = JSON.stringify(response.data.subscribers)  
   
    
    returnResult.push(JSON.parse(result))
    console.log(returnResult)
    res.send(returnResult);


  })
  .catch((error) => {
  console.log(error);
  });

});

// This section will help you get a single record by id



// This section will help you update a record by id.

// This section will help you delete a record

export default router;