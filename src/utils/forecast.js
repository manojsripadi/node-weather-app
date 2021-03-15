const request = require('request');

const weatherReport = (latLong, callback) => {
    if(!latLong) {
callback('Please provide the correct latitude|longitude values');
    } else {
        const latitude = latLong[0];
        const longitude = latLong[1];
        const url = `http://api.weatherstack.com/current?access_key=903874228f9e16fecc4ed77d9122aa3f&query=${latitude},${longitude}`;
        request({url, json:true}, (error, res) => {
            if (res.body) {
                if (res.body.error) {
                    if (res.body.error.code) {
                        callback("ErrorCode: " + res.body.error.code);
                        callback("ErrorMessage: " + res.body.error.info);
                    } else {
                        callback(chalk.red('Something went wrong, Please try again sometime later'));
                    }
                } else {
                    const {temperature, feelslike:feelsLike} = res.body.current ;
                    callback(undefined, {temperature , feelsLike})
                }
            } 
        })
    }
}

module.exports = weatherReport;