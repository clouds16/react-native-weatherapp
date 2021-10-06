import React, { useState  , useEffect} from 'react';
import {View, TextInput , Button, Text , StyleSheet, Switch , Image} from 'react-native'
import axios from 'axios'
import Sunny  from '../assets/pngs/partly-rainy.png'
import Cloudy from '../assets/rns-weather-icons/PNG/storm.png'
import MainIcon from '../assets/pngs/weathericonpng.png'
import Clear from '../assets/rns-weather-icons/PNG/clear.png'
function weatherSearch(){
    let [city , changeCity] = useState('')
    let [weather , setWeather] = useState('No weather yet')
    let [image, setImage] = useState(MainIcon)
    let [forecast , setForecast] = useState("")
    
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState)

    

    const apikey = 'e07b291785207b5575a4ffc1db8ceac3'
    let url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +  "&appid=" + apikey;

    // const key = 'e07b291785207b5575a4ffc1db8ceac3'
    // const url = 'api.openweathermap.org/data/2.5/weather?q='+ city + '&appid='+ key ;

    function getWeather(){
        axios.get(url).then( (response) => {
            console.log(response.data)            
            setWeather( response.data.main.temp )
            setForecast(response.data.weather[0].main.toLowerCase())
            switchWeather(forecast)

            
        }).catch( (e)=> {
            console.log(e)

        } )
    }

    function switchWeather(forecast) {
        forecast.toLowerCase()
        console.log(forecast)

        switch (forecast) {
            case 'clouds' || 'cloudy' :
                console.log("setting to cloudy")
                setImage(Cloudy)
                break
            case 'sunny' || 'sun' :
                console.log("setting to sunny")
                setImage(Sunny);
                break
            case 'clear' :
                console.log("Setting to clear")
                setImage(Clear)
                break

            default :
                console.log("setting to default")
                setImage(MainIcon);
                break
        }

    }

    return (
        <View> 
            <TextInput 
            name="city" 
            value={city} 
            onChangeText={text=> changeCity(text)}
            placeholder= "Enter a city..."
            style= {styles.inputbox}></TextInput>
            
            <Switch 
                trackColor={{ false: "orange", true: "green" }}
                thumbColor={isEnabled ? "white" : "white"}
            
                onValueChange={toggleSwitch}
                value={isEnabled}/> 
            <Text> {isEnabled ? "celcuis" : "farenheit" }</Text>

            <Button style={styles.button}  onPress={getWeather} title="Search">  </Button>
           
            <Image source={image} style= {styles.tinyLogo} ></Image>
            <Text style = {styles.weather}> {isEnabled ? Math.round(weather - 273): (9/5 * Math.round(weather -273) +32)  }</Text>

        </View>
    )
}

const styles = StyleSheet.create({

    button: {
      fontSize: 20,
      textAlign: "center",
      margin: 10,
      fontWeight: "bold", 
      borderColor: 'green',
      borderRadius: 10 ,
      borderWidth: 3 , 
      backgroundColor : "purple"
    },
    tinyLogo: {
        width: '100%',
        height: 300,
   
      },
    inputbox : {
        color: 'white',
        textAlign: "center",
        fontSize: 30,
        padding: 20,
        borderColor: 'gray', 
        borderWidth: 1,  
        borderRadius: 2 ,
       
        backgroundColor : 'blue'
    }, 
    weather: {
        fontSize: 60 ,
        textAlign: "center",
        

    }, 
    svg : {
        
        width: '100%',
        height: 'auto',
    }
  });

export default weatherSearch;