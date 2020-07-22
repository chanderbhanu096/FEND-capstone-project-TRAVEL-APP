import{geo_Api,weatherAPI,PixaBayAPI} from './datafetchfromapis'

//post Data to the server

var submitcounter = 0 ;
const postDataToServer = async (Url = '', data = {}) => {
    //body of the response
    const response = await fetch(Url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        //wait for data from server
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log('postData error: ', error);
    }
};


    export function submitEvent(){
        console.log('button is clicked')
    //fetch location of the plcae from userinput 
    const place_name = document.getElementById('placetogo').value;

    // fetch date from the userinput
    const date = document.getElementById('dateid').value;
    
    //current date of the system
    // const getCurrentDate = (addDate = 0) => {
    //     let newDate = new Date().addDays(addDate);
    //     let month = newDate.getMonth();
    //     if (month < 10) {
    //         month = `0${month + 1}`;
    //     } else month++;
    //     let date = newDate.getDate();
    //     if (date < 10) date = `0${date}`;
    //     return `${newDate.getFullYear()}-${month}-${date}`;
    // };

    const date1 = new Date(); 
    const date2 = new Date(date);

   
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates 
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
   
    console.log(Difference_In_Days);
    
    


    if(place_name=='')
    {
        document.getElementById('placetogo').style.cssText="border:1px solid red";
        document.getElementById('nameerror').innerHTML="enter name";
    }
   else if(date=='')
    {
        document.getElementById('dateid').style.cssText="border:1px solid red";
        document.getElementById('dateerror').innerHTML="select appropriate date";
    } 
   else if(Difference_In_Days >= 10){
    document.getElementById('dateid').style.cssText="border:1px solid red";
    document.getElementById('dateerror').innerHTML="Please Enter date upto 10 days ahead with rerspect the current date";
   }
   else if(Difference_In_Days < 0){
    document.getElementById('dateid').style.cssText="border:1px solid red";
    document.getElementById('dateerror').innerHTML="Please Enter a Valid Date for future trip";
   }

   else{geo_Api(place_name).then(function(geoData){
        const lat = geoData.geonames[0].lat;
        const lng = geoData.geonames[0].lng;

        weatherAPI(10,lat,lng).then(function(weatherData){
            PixaBayAPI(geoData.geonames[0].name+'+'+geoData.geonames[0].countryName).then(function(picData){
                let postData = {
                    latitude: weatherData.lat,
                    longitude: weatherData.lon,
                    cityName: geoData.geonames[0].name,
                    country: geoData.geonames[0].countryName,
                    max_temp: weatherData.data[weatherData.data.length - 1].max_temp,
                    min_temp: weatherData.data[weatherData.data.length - 1].min_temp,
                    weatherdescription: weatherData.data[weatherData.data.length - 1].weather.description,
                    weathericon: weatherData.data[weatherData.data.length - 1].weather.icon,
                    tripDate: weatherData.data[weatherData.data.length - 1].valid_date,
                    imageUrl: picData.hits[0] ? picData.hits[0].webformatURL : null
                };
                localStorage.setItem('TravelInfo', JSON.stringify(postData));
                postDataToServer('http://localhost:3000/addTravelInfo', postData);
            })
            .then(getDataFromServer('http://localhost:3000/getTravelInfo').then(function(getData)
            {
               
                updateUserInterface(getData);
            })
            );
        })
    })
}};

//To get the data saved on the server

const getDataFromServer=async (baseurl)=>
{
    const weatherdata=await fetch(baseurl);
    try{
        const getData=weatherdata.json();
        return getData;
    }
    catch(error)
    {
        console.log("server error"+error);
    }
}
//update data/UI on the use
const updateUserInterface = (getData) => {

    
    console.log(getData.min_temp);
    document.getElementById('min-temp').innerHTML=`Minimum Temp: ${getData[1].min_temp}`;
    document.getElementById('max-temp').innerHTML=`Maximum Temp: ${getData[1].max_temp}`;
    document.getElementById("mainimage").src = "`${getData[1].imageUrl}`";
    console.log(`${getData[1].imageUrl}`);
    document.getElementById("mainimage").style.display = "block";
    document.getElementById("mainimage").setAttribute("src", `${getData[1].imageUrl}`);
    
}

