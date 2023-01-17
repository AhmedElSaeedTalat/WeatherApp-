// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

const express = require('express');

// Start up an instance of app

const app = express();

// define body-parser

const bodyParser = require('body-parser');


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
	
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

const listenToServer = () => {
	console.log("Working server is " + port);
}

app.listen(port,listenToServer);


//Add a GET route that returns the projectData object in your server code 

const sendProjectData = (req, res) => {
	res.send(projectData);
}

app.get("/all",sendProjectData);

// add a POST route that adds incoming data to projectData

const addData = (req,res) => {
	
	projectData = {

		temperature: req.body.temperature,
		
		date: req.body.date,
		
		userResponse: req.body.userResponse
	}
	// console.log(projectData);

	return projectData;

}

app.post("/addData",addData);