const request = require('request');


const forecast = (latidude,longitude, callback) => {
    const url = "https://api.darksky.net/forecast/421fbc930a78ae58a63dc66c9b6da1ed/"  + encodeURIComponent(longitude) + "," + encodeURIComponent(latidude)
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!")
        } else if (body.code === 400) {
            callback('Unable To Find Location')
        } else {
            callback(undefined, {
                timezone : body.timezone,
                Summary : body.daily.data[0].summary,
                Temperature: body.currently.temperature,
                Rainchance :  body.currently.precipProbability
            })
        }
    }
    )

    
}

module.exports = forecast