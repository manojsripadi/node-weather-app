
const request = require('request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWFub2pzcmlwYWRpIiwiYSI6ImNra2NodDJ0MDA1ejMyb3A3ZmtsZHo4ajAifQ.sdSAviW2E4mIwFM5U1bhlQ&limit=1`;
    request({url:url, json:true},(err, res)=>{
            if(err){
                callback(chalk.red('Something went wrong, Please try again sometime later'));
            } else if(res.body.message || res.body.features.length === 0){
                callback('Results Not found! try changing the location');
            } else {
                const latLong = res.body.features[0].center.reverse();
                const placeName = res.body.features[0].place_name;
                callback(undefined, {latLong, placeName});
            }
    })
};

module.exports = geoCode;