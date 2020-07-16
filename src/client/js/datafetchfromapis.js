import {geoNamesApiUrl,weatherBitApiUrl,pixaBayApiUrl} from './apis';

/* fetching data from different Apis */

// fetching data from geoNames Api
const geo_Api = async(name_of_city) => {

    const geourl = geoNamesApiUrl(name_of_city);
    const response = await fetch(geourl);
    const data = response.json();
    console.log(data);
    return data;
}

// fetching data from the  Weather API
const weatherAPI = async(days,lat,long) => {
    const weatherURL = weatherBitApiUrl(days,lat,long);
    const response = await fetch(weatherURL);
    const data = response.json();
    console.log(data);
    return data;
}

// fetching image from PixaBay Api
const PixaBayAPI =async(name_of_city) => {
    const pixaUrl = pixaBayApiUrl(name_of_city);
    const response = await fetch(pixaUrl);
    const data = response.json();
    console.log(data);
    return data;
}
export{geo_Api,weatherAPI,PixaBayAPI}