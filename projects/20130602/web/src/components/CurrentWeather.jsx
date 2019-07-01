import React from 'react'
import * as util from '../util';
import Weather from "./Weather";
import { Button, message } from 'antd'

class CurrentWeather extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount = () => {
    const {city, country} = this.props
    const base = "http://54.180.147.246:8080/weather/now"
    const url = `${base}?city=${city}&country=${country}+&units=metric`
    fetch(url, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
      }
    })
      .then(util.handleResponse)
      .then(response => {
        const data = JSON.parse(response)
        this.setState({
          'weather': data['weather'][0]['main'],
          'description': data['weather'][0]['description'],
          'img_src': 'http://openweathermap.org/img/w/'+data['weather'][0]['icon']+'.png',
          'temp': data['main']['temp'],
          'humidity': data['main']['humidity'],
          'wind_speed': data['wind']['speed'],
          'clouds': data['clouds']['all'],
          'precipitation': 0
        })
        if(data['rain']){
          this.setState({
            'precipitation': data['rain']['1h']
          })}
      })
      .catch(error=>{
        message.error(error)
      })
  }

  handleLookNow=()=>{
    // fetch cluster when looknow clicked
    const {temp, wind_speed, humidity, clouds, precipitation} = this.state
    const {onClickLookNow} = this.props
    
    // weather to server & fetch cluster
    const base = "http://54.180.147.246:8080/weather/cluster"
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        temp: temp,
        wind_speed: wind_speed,
        humidity: humidity,
        clouds: clouds,
        precipitation: precipitation,
      })
    }
    fetch(base, requestOptions)
    .then(util.handleResponse)
    .then(response => {
      const { cluster, is_rain } = response.data
      onClickLookNow(cluster, is_rain) // cluster, is_rain to Server( from main to server)
    })
    .catch(error => {
      message.error(error)
    })
  }

    render() {
      const {temp, humidity, wind_speed, clouds, description, img_src } = this.state
      const { city, country, USER} = this.props
      return (
        <React.Fragment>
            <div className="cw-wrapper">
              <div className="cw-main">
                <div className="cw-container">
                  <div className="cw-row">
                    <div className="cw-col-xs-5 title-container">
                      <h1>Current Weather</h1>
                    </div>
                    <div className="cw-col-xs-7 form-container">
                    <img 
                      src={img_src}
                      alt="icon"
                      />
                      <Weather
                        city={city}
                        country={country}
                        temperature={temp}
                        wind_speed={wind_speed}
                        humidity={humidity}
                        clouds={clouds}
                        description={description}
                      />
                    </div>
                  </div>
                  {USER&&
                    (<Button 
                      type="primary" className='btn-looknow' block
                      onClick={this.handleLookNow}
                    >
                      Look Now
                    </Button>)}
                </div>
              </div>
            </div>
        </React.Fragment>
      )
    }
  }
  
  export default CurrentWeather