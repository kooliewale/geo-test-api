const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require('axios');
const app = express();
const url=require('url')
const PORT = process.env.PORT || 4500;



const BASE_URI = 'https://api.weatherapi.com/v1';  
app.use(bodyParser.json());
app.use(cors());
var DATA=[];

const logRequest = (req, res, next) => {
  // console.log(`--- Request Details ---`);
  // console.log(`Method: ${req.method}`);
  // console.log(`URL: ${req.url}`);
  // console.log(`Headers:`);
  // console.dir(req.headers); // Use console.dir for better formatting
  // console.log(`Body:`);
  // console.dir(req.body);   // Access body data for POST requests (if applicable)
  DATA['method']=req.method;
  DATA['REQ_URL']=req.url;
  DATA['headers']=req.headers;
  DATA['body']=req.body

  next();
};

// Apply the middleware to handle all requests
app.use(logRequest);

// Handle all requests and delegate weather data fetching
app.all('*', (req,res)=> {
  if (req.url.match('current.json'))
  {
const url = `${BASE_URI}${req.url}`;  
DATA['WEATHER_URL']=url;
 return axios.get(url)  
    .then(response => { 
      res.send(response.data); 
      DATA['SEVER_SENT_BACK']=response.data;
      console.log(DATA);
    })
        .catch(error => {  
           throw error;
        })
}
else
{
  res.send(req.url);
      console.log(DATA);
}
}) ;


app.listen(PORT, () => {
  console.log(`Weather API Proxy listening on port ${PORT}`);
});
