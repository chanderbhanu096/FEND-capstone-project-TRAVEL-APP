/* Geoname Api Accessing */
const geoNamesApiUrl = name => {
    const baseUrl = 'http://api.geonames.org/searchJSON?username=chanderbhanu096&fuzzy=0.8&maxRows=1&name=';
    const geoApi =baseUrl + name; 
    
    return geoApi;
};

/* Weather API full URl */
const weatherBitApiUrl = (time,lat,long)=>{
    const  WeatherApiUrl = `http://api.weatherbit.io/v2.0/forecast/daily?units=M&key=cc37e73082c54ce2ac8b59591d1b6006&days=${time}&lat=${lat}&lon=${long}`;
    return WeatherApiUrl;
};

/* using the API for fetching travelling location image */ 
const pixaBayApiUrl = place => {
    const pixApi= `https://pixabay.com/api/?key=15324148-2985f37b999ac9cae0550d3a1&q=${place}&image_type=photo`;
    return pixApi;
};

export{geoNamesApiUrl,weatherBitApiUrl,pixaBayApiUrl}