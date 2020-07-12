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


const port=8081;
const server=app.listen(port,startServer);
function startServer()
{
    console.log("server is started on 8081");
}

// Trip Info
app.post('/TripInfo',function(req,res){

    console.log(req.body);
    newEntry={
        weather:req.body.weather,
        date:req.body.TripDate,
        cityname:req.body.cityname,
    };
    postData1.push(newEntry);
    res.send(postData1);
});


app.get('/getTripInfo',function(req,res){
        res.send(postData1);
});