window.addEventListener('load',()=>{
    //lägg till händelselyssnare som ska ringas 
    let long;
    let lat;
    let temperatureDescription = document.querySelector(
        ".temperature-description");
        //querySelector är en metod för element gränssnitt, returnerar det första elementet

    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const  temperatureSpan = document.querySelector(".temperature span");

    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(position => {
           //för att hämta den aktuella positionen från kartan api
         long = position.coords.longitude;
         lat = position.coords.latitude;
        
         const proxy = "https://cors-anywhere.herokuapp.com/";
         const api = `${proxy}https://api.darksky.net/forecast/580456cc363347b747d1adc42cef0c8a/${lat},${long}`// api från darkskynet
        

         fetch(api)//hämta api
         .then(response => {
             return response.json();
         })
         .then(data => {
            console.log(data);
             const {temperature, summary, icon} = data.currently;
             //sätt in data från Api
             temperatureDegree.textContent = temperature;
             temperatureDescription.textContent = summary;
             locationTimezone.textContent = data.timezone;
             
             //uträkning för Celsius
             let celsius = (temperature - 32) * (5 / 9);
             //Ikonen
             setIcons(icon, document.querySelector(".icon"));

             //omvandla till Celcius
             temperatureSection.addEventListener('click', ()=> {
                 if(temperatureSpan.textContent ==="F"){
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = Math.floor(celsius);
                    //Math floor returnerar största heltal- statisk metod
                 }else{
                    temperatureSpan.textContent = "F";
                    temperatureDegree.textContent = temperature;
                 }
             });
       });
       
       });
    }
    function setIcons(icon, iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);       

    }
});
