const express = require ("express");
const https = require ("https");
const bodyParser = require("body-parser");

const app = express ();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

    const query = req.body.cityName;
    const apiKey = "4f7cc410dc86de4765d8e3b0f7391737";
    const unit = "metric";
    const url = "api.openweathermap.org/data/2.5/forecast?id=524901&appid={4f7cc410dc86de4765d8e3b0f7391737}";
    
    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`


            res.write(`<p>The weather is currently ${desc}.</p>`)
            res.write(`<h1>The temperature in ${query} is ${temp} degrees Celcius.</h1>`)
            res.write(`<img src='${imageURL}'/>`)
            res.send()
        })
    })
})





app.listen(3000, function() {
    console.log("Server is running on port 3000");
});



