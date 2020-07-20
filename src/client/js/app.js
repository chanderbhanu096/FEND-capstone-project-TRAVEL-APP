import{geo_Api,weatherAPI,PixaBayAPI} from './datafetchfromapis'

//post Data to the server

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
    const date1 = document.getElementById('dateid').value;
    
//     //current date of the system
//     const getCurrentDate = (addDate = 0) => {
//         let newDate = new Date().addDays(addDate);
//         let month = newDate.getMonth();
//         if (month < 10) {
//             month = `0${month + 1}`;
//         } else month++;
//         let date = newDate.getDate();
//         if (date < 10) date = `0${date}`;
//         return `${newDate.getFullYear()}-${month}-${date}`;
//     };

//     //TO FIND THE DIFFERENCE BETWEEN THE CURRENT TIME AND THE USER INPUTTED TIME
//     var Difference_In_Time = date.getTime() - today.getTime(); 

//     const Difference_In_Time = Math.ceil(Math.abs(new Date() - new Date(date1)) / (1000 * 60 * 60 * 24));
//     // To calculate the no. of days between two dates 
//     var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 

//     if(place_name=='')
//     {
//         document.getElementById('placetogo').style.cssText="border:1px solid red";
//         document.getElementById('nameerror').innerHTML="enter name";
//     }
//     if(date=='')
//     {
//         document.getElementById('dateid').style.cssText="border:1px solid red";
//         document.getElementById('dateerror').innerHTML="select appropriate date";
//     }
//    if(!isDateValid(date))
//    {
//     document.getElementById('dateid').style.cssText="border:1px solid red";
//     document.getElementById('dateerror').innerHTML="select appropriate date";
//    } 
//    if(Difference_In_Days >= 10){
//     document.getElementById('dateid').style.cssText="border:1px solid red";
//     document.getElementById('dateerror').innerHTML="Please Enter date upto 10 days ahead with rerspect the current date";
//    }
//    if(Difference_In_Days < 0){
//     document.getElementById('dateid').style.cssText="border:1px solid red";
//     document.getElementById('dateerror').innerHTML="Please Enter a Valid Date for future trip";
//    }

   geo_Api(place_name).then(function(geoData){
        const lat = geoData.geonames[0].lat;
        const lng = geoData.geonames[0].lng;

        weatherAPI(10,lat,lng).then(function(weatherData){
            PixaBayAPI(geoData.geonames[0].name+'+'+geoData.geonames[0].countryName).then(function(picData){
                let postData = {
                    latitude: wData.lat,
                    longitude: wData.lon,
                    cityName: gData.geonames[0].name,
                    country: gData.geonames[0].countryName,
                    max_temp: wData.data[wData.data.length - 1].max_temp,
                    min_temp: wData.data[wData.data.length - 1].min_temp,
                    weatherDesc: wData.data[wData.data.length - 1].weather.description,
                    tripDate: wData.data[wData.data.length - 1].valid_date,
                    imageUrl: pData.hits[0] ? pData.hits[0].webformatURL : null
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
};

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


}

