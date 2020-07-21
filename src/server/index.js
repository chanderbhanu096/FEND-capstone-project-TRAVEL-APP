//initializing the express server
const express=require('express');
const app=express();
const postData1=[];
//add middleware to the server

const bodyparser=require('body-parser');

app.use(bodyparser.urlencoded({
    extended:false
}));
app.use(bodyparser.json());

//add cors 

const cors=require('cors');
app.use(cors());


app.use(express.static('dist'))

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'));
})


const port=3000;
const server=app.listen(port,startServer);
function startServer()
{
    console.log("server is started");
}

/*create routes for post request of weather data*/
app.post('/addTravelInfo',function(req,res){

    console.log(req.body);
    newEntry={
        weather:req.body.weather,
        cityName:req.body.cityName,
        longitude:req.body.longitude,
        latitude:req.body.latitude,
        weatherdescription:req.body.weatherdescription,
        weathericon:req.body.weathericon,
        country:req.body.country,
        max_temp:req.body.max_temp,
        min_temp:req.body.min_temp,
        tripDate:req.body.tripDate,
        imageUrl:req.body.imageUrl,
    };
    postData1.push(newEntry);
    res.send(postData1);
});


app.get('/getTravelInfo',function(req,res){
        res.send(postData1);
});