// In src/index.js 
const express = require("express"); 
const bodyParser = require("body-parser");
const cors=require("cors");
const axios = require('axios');
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


app.get('/', (req, res) => {
  if (req.url.endsWith('/current.json')) { // Check if URL ends with '/current.json'
    const fullUrl = `${BASE_URL}${req.url}`; // Construct complete URL

    axios.get(fullUrl)
      .then(response => {
        res.send(response.data); // Send fetched data from backend
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        res.status(500).send('Error retrieving data'); // Handle errors gracefully
      });
  } else {
    res.send('GET request received!');
  }
});

app.post('/', (req, res) => {
  console.log('Received data:', req.body); // Access POST request body
  res.send('POST request received!');
});


app.listen(PORT, () => { 
    console.log(`${PROJECT} API version ${VERSION} is listening on port ${IP}:${PORT}      ${serverStartTime} `); 
});
