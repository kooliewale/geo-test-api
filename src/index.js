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

// Specific route handlers (optional)
app.get('/', (req, res) => {
  res.send('GET request received!');
});

app.post('/', (req, res) => {
  console.log('Received data:', req.body); // Access POST request body
  res.send('POST request received!');
});


app.listen(PORT, () => { 
    console.log(`${PROJECT} API version ${VERSION} is listening on port ${IP}:${PORT}      ${serverStartTime} `); 
});
