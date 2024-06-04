// In src/index.js 
const express = require("express"); 
const bodyParser = require("body-parser");
const cors=require("cors");

const app = express(); 
const PORT = process.env.PORT||4500; 
const IP='http://127.0.0.1';
const PROJECT=process.env.PROJECT||'KT';
const VERSION=process.env.VERSION|'v0.0.1';
const serverStartTime = new Date();  
const DATA_MOCK=require ('./data.json');
app.use(bodyParser.json());
app.use(cors());   
// Middleware function to log details for all requests
const logRequest = (req, res, next) => {
  console.log(`--- Request Details ---`);
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);
  console.log(`Headers:`);
  console.dir(req.headers); // Use console.dir for better formatting
  console.log(`Body:`);
  console.dir(req.body);   // Access body data for POST requests (if applicable)

  // Allow further processing in the request-response cycle
  next();
};

// Apply the middleware to handle all requests
app.use(logRequest);

app.all('*',(req,res)=> {
  res.send(DATA_MOCK);
});


app.listen(PORT, () => { 
    console.log(`${PROJECT} API version ${VERSION} is listening on port ${IP}:${PORT}      ${serverStartTime} `); 
});
