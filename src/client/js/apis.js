/* Geoname Api Accessing */
const geoNamesApiUrl = name => {
    const baseUrl = 'http://api.geonames.org/?username=chanderbhanu096=0.8&maxRows=10&name=';
    const geoApi =baseUrl + name; 
    return geoApi.json();
};

/* Weather API full URl */
const weatherBitApiUrl = (time,lat,long)=>{
    const  WeatherApiUrl = `http://api.weatherbit.io/v2.0/forecast/daily?units=M&key=cc37e73082c54ce2ac8b59591d1b6006&days=${time}&lat=${lat}&lon=${long}`;
    return WeatherApiUrl.json();
};

/* using the API for fetching travelling location image */ 
const pixaBayApiUrl = place => {
    const pixApi= `https://pixabay.com/api/?key=${pixKey}&q=${place}&image_type=photo`
    return pixApi.json();
};

export{geoNamesApiUrl,weatherBitApiUrl,pixaBayApiUrl}