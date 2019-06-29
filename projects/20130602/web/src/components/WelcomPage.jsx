import React from 'react'
import './Main.css'
import Nav from './Nav'
import { Button, Select } from 'antd'
import { Link } from "react-router-dom"
import CurrentWeather from './CurrentWeather'
import WeeklyWeather from './WeeklyWeather'
import {getUser} from '../authentication'

const { Option } = Select;

class WelcomePage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        'city': 'Seoul',
        'country': 'KR',
        'timestamp': Date.now(),
        'USER': getUser()
        }
    }

    onSelectChange=(value)=>{this.setState({city:value})}

    render() {
    const {city, country, USER} = this.state

    return (
        <React.Fragment>
            <Nav currentPath={this.props.location.pathname}/>
            <Link to="/register">
                <Button type="primary" className='btn-register'>Register</Button>
            </Link>

            {!USER&&
            (<Link to="/login">
                <Button type="primary" className='btn-login'>Login</Button>
            </Link>)}

            {USER&&
            (<Link to="/login">
                <Button type="primary" className='btn-login'>Logout</Button>
            </Link>)}

            <div className="weather-wrapper">
                <div className='city-selector'>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Seoul"
                        optionFilterProp="children"
                        onChange={this.onSelectChange}
                        filterOption={
                            (input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="Seoul">Seoul</Option>
                    </Select>
                </div>
                <div className="CurrentWeather-container">
                    <CurrentWeather city={city} country={country}/>
                </div>
                    <br/>
                    <br/>
                    <div className="WeeklyWeather-container">
                    <WeeklyWeather city={city} country={country}/>
                </div>
            </div>

        </React.Fragment>
    )
    }
}

export default WelcomePage