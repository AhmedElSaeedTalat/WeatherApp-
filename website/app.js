/* Global Variables */


//Api credentials

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";

const apiKey = '3010341b38b8a176c38722414ded11a0&units=imperial';

//Selectors

const zipBtn = document.querySelector("#generate");

const getZip = document.querySelector("#zip");

const feelings = document.querySelector("#feelings");


// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


/*
	 helping functions 

*/

// function to build API URL based on ZiP code provided

const buildurl = () => {

	const zipValue = getZip.value;

	const zip =  zipValue ; 

    const api = `${baseUrl}${zip},us&appid=${apiKey}`;

    return api;
}

// helping function to prepare the data the I will send to server using post method:

const dataToSend = (datas) => {


	// first here i decide if the data that was sent is string , to know which data to send based on the request status on get request from API
	// more details please check the get request
	
	if (typeof datas === 'string') {
		
		const data = {
		
		temperature: datas,
		
		date: newDate,
		
		userResponse: feelings.value

		} 

		return data;

	}	else {

			const data = {
			
				temperature: datas.main.temp,
		
				date: newDate,
		
				userResponse: feelings.value

			}
			return data;
		
		}
	
	
	
}


/*
	 main functions 

*/

// main click function to chain GET ,POST and update UI

const generateApi = () => {



    getApiData(buildurl())
    .then(function(data){

    	postData("/addData",data);
    
    })
    .then(function(){

    	updateUI();
    
    });

    // adding a code to clear the ZIP code input after making the requests, to make it easy to enter new input.

    getZip.value= "";


}


//  function to get the data from API 

const getApiData = async (url) => {

	
	const response = await fetch(url);

	// here i check the response status to decide which type of data I can send

	if(response.status === 200) {

		try{

			const data = await response.json();

			return data;

		} 	catch(error) {
		
				console.log("error is " + error);
		
		}	
	} else {
		const data = "Not a valid zip code, please Enter a valid ZiP Code";

		return data;

	}


}


//  function to post data recieved 

const postData = async (url,data = {}) => {


	const response = await fetch(url,{
		
		method:"POST",
		
		credentials:"same-origin",
		
		headers: {
		
			"Content-type": "application/json"
		
		},
		
		body: JSON.stringify(dataToSend(data))
	});

	try{
	
		const newDate = response.json();
	
		return newDate;
	
	} catch(error){

		console.log("error is " + error);
	
	}
}


// updating the UI with the new data added

const updateUI = async () => {

	const response = await fetch("/all");

	try{

		const data  = await response.json();

		// check which type of data we have if it's string then the zip code entered wasnt valid, and sent instead a sting to notifiy the user .

		if(typeof data.temperature === 'string') {

			document.getElementById('temp').innerHTML = data.temperature;
		
		} else {

			document.getElementById('temp').innerHTML = Math.round(data.temperature)+ ' degrees';

		}
		
 		
 		document.getElementById('content').innerHTML = data.userResponse;
 		
 		document.getElementById("date").innerHTML = data.date;

    	// adding a code to clear the feelings code input after making the requests, to make it easy to enter new input.

 		feelings.value = "";


	} catch(error) {

		console.log("error is " + error);

	}
}


/*
	 main Events 

*/

zipBtn.addEventListener("click",generateApi); 









