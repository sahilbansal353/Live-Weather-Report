const express=require("express");
const app=express();
const bodyParser=require("body-parser")
const https=require("https");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  var city=req.body.Cityname;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=a2b127058736c6364a9f44e96b00ff67&units=metric";
  https.get(url,function(response){
    response.on("data",function(data){
      const weatherdata=JSON.parse(data);
      console.log(weatherdata);
      const x=weatherdata.main.temp;
      const y=weatherdata.weather[0].icon;
      const z=weatherdata.weather[0].description;
      var city=req.body.Cityname;
      const icon="http://openweathermap.org/img/wn/" + y + "@2x.png";
      res.write("<p>the weather is currently " + z + "</p>");
      res.write("<h1>the temperature in " + city + " is " + x + "degrees</h1>");
      res.write("<img src=" + icon + ">");

      res.send();
    });
  });
});



app.listen(3000,function(){
  console.log("server is started ");
});
