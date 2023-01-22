const http = require('http');

const PORT = 3000;

// Create an HTTP server
const server = http.createServer();

// Initialize an array to store friends
const friends = [
  {
    id: 0,
    name: 'Nikola Tesla',
  },
  {
    id: 1,
    name: 'Sir Isaac Newton',
  },
  {
    id: 2,
    name: 'Albert Einstein',
  }
];

// Attach a request handler to the server
server.on('request', (req, res) => {
  // Split the request URL into an array of path items
  const items = req.url.split('/');
  // Example: /friends/2 => ['', 'friends', '2']
  // Example: /friends/ => ['', 'friends', '']
  
  // Handle a POST request to the /friends endpoint
  if (req.method === 'POST' && items[1] === 'friends') {
    // Listen for the request body
    req.on('data', (data) => {
      const friend = data.toString();                                     // Parse the request body as a JSON string
      console.log('Request:', friend);
      friends.push(JSON.parse(friend));                                   // Add the new friend object to the array
    });
    req.pipe(res);                                                        // Pipe the request data to the response
    
  // Handle a GET request to the /friends endpoint
  } else if (req.method === 'GET' && items[1] === 'friends') {
    res.statusCode = 200;                                                 // Set the status code and headers for a successful response
    res.setHeader('Content-Type', 'application/json');
    
    // If the request URL includes a friend ID, return the corresponding friend object
    if (items.length === 3) {
      const friendIndex = Number(items[2]);
      res.end(JSON.stringify(friends[friendIndex]));
    } else {
    // Otherwise, return the entire array of friends
      res.end(JSON.stringify(friends));
    }
    
  // Handle a GET request to the /messages endpoint
  } else if (req.method === 'GET' && items[1] === 'messages') {
    res.setHeader('Content-Type', 'text/html');                           // Set the headers for an HTML response
    
    // Write the HTML content to the response
    res.write('<html>');
    res.write('<body>');
    res.write('<ul>');
    res.write('<li>Hello Isaac!</li>');
    res.write('<li>What are your thoughts on astronomy?</li>');
    res.write('</ul>');
    res.write('</body>');
    res.write('</html>');
    res.end();
    
  // Handle all other requests
  } else {
    res.statusCode = 404;                                                // Set the status code for a not found response
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
}); //127.0.0.1 => localhost