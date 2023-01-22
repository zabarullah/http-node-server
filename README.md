# http-node-server
Simple http node server

This is a simple Node.js script that creates an HTTP server using the built-in http module. The server listens on port 3000, and it handles 
three types of requests:

A POST request to /friends adds a new friend object to the friends array. The new friend object is sent in the request body, and it's parsed from 
JSON and appended to the array.
A GET request to /friends returns a JSON array of all friends. If a numeric ID is included in the request URL (e.g. /friends/2), it returns the 
friend object with that ID.
A GET request to /messages returns a simple HTML page with a list of messages.
For other requests, the server returns a 404 status code and an empty response.

Each request handler sets the appropriate status code and headers before sending the response, and it logs the request data to the console for 
debugging purposes. When the server starts, it logs a message to the console indicating that it's listening on port 3000.
