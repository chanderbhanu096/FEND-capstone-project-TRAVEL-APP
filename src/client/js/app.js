import{geo_Api,weatherAPI,PixaBayAPI} from './datafetchfromapis'

const submitEvent = event => {
    //fetch location of the plcae from userinput 
    const place_name = document.getElementById('placetogo').value;

    // fetch date from the userinput
    const date = document.getElementById('dateid').value;
    
    //current date of the system
    var today = new Date();

    //TO FIND THE DIFFERENCE BETWEEN THE CURRENT TIME AND THE USER INPUTTED TIME
    var Difference_In_Time = date.getTime() - today.getTime(); 

    // To calculate the no. of days between two dates 
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 

    if(place_name=='')
    {
        document.getElementById('placetogo').style.cssText="border:1px solid red";
        document.getElementById('nameerror').innerHTML="enter name";
    }
    if(date=='')
    {
        document.getElementById('dateid').style.cssText="border:1px solid red";
        document.getElementById('dateerror').innerHTML="select appropriate date";
    }
   if(!isDateValid(date))
   {
    document.getElementById('dateid').style.cssText="border:1px solid red";
    document.getElementById('dateerror').innerHTML="select appropriate date";
   } 
   if(Difference_In_Days >= 10){
    document.getElementById('dateid').style.cssText="border:1px solid red";
    document.getElementById('dateerror').innerHTML="Please Enter date upto 10 days ahead with rerspect the current date";
   }
   if(Difference_In_Days < 0){
    document.getElementById('dateid').style.cssText="border:1px solid red";
    document.getElementById('dateerror').innerHTML="Please Enter a Valid Date for future trip";
   }else{
       callGeoApi(place_name);
   }

}
