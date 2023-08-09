import * as drip from  "drip-nodejs"
import express from "express";
import db from "../db/conn.mjs";
import axios from "axios";

let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api.getdrip.com/v2/9967522/subscribers/',
    headers: { 
      'Authorization': 'Basic MDY3MmRjNTIyZDNiNjgyN2U0MDY1YzI4NjZiNTkwMjI6'
    }
  };


const router = express.Router();

router.get("/", async (req, res) => {

   
            let response = await axios.request(config)
            .then((response) => {
                const result = (JSON.stringify(response.data))
            console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
            console.log(error);
            });
        //console.log(records)
        //console.log("working get request")

    res.json(result).status(200);
  });



  export default router;