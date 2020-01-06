const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


// Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templetes/views')
const partialsPath = path.join(__dirname, '../templetes/partials')


// Setup handle bars and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup Static Directory to Serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Amrit"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Amritpal"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        summary: "We are here to  help you",
        title: "Help",
        name: "Amrit"
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Must Provide an address"
        })
    }
    geocode(req.query.address, (error, { latidude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }
        forecast(latidude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                temperature: forecastData.Temperature,
                location,
                address: req.query.address,
                rainchance:forecastData.Rainchance
            })

        })

    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term,"
        })
    }

    res.send({
        product: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: "Amrit",
        errorMessage: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render("404", {
        title: 404,
        name: "Amrit",
        errorMessage: "Page Not Found"
    })
})

app.listen(3000, () => {
    console.log("SERVER IS STARTED")

})