import React from 'react'
import Daily from './Daily'
import * as util from '../util'
import { getAToken, getRToken, logout } from "../authentication"

class MyScrap extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            'dailys':[]
        }
    }

    componentDidMount=()=>{
        const {user_id} = this.props
        const base = "http://54.180.147.246:8080/user/"
        const url = base + user_id + '/myscrap'
        const AToken = getAToken()
        const RToken = getRToken()
        
        fetch(url, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AToken,
            'refreshToken': RToken
        }
        })
        .then(util.handleResponse)
        .then(response => {
            const data = response
            this.setState({
                'dailys': data['dailys']
            })
        })
        .catch(error=>{
            console.log(error)
            logout()
        })
    }

    handleDailysUpdate=(daily_id, is_scrap)=>{
        let put_dailys = this.state.dailys

        if(!is_scrap){
            for(let i=0; i < put_dailys.length; i++ ){
                if(put_dailys[i].daily_id === daily_id){
                    put_dailys.splice(i, 1)
                    this.setState({ 
                        'dailys': put_dailys
                    })
                    break
                }
            }
        }
    }

    render(){
        const {dailys} = this.state
        const {user_id} = this.props
        const {handleDailysUpdate} =this

        const myScraps = dailys.map(
            ({daily_id, datetime, img_path, satis, creater_id}) => (
                <Daily
                    daily_id={daily_id}
                    user_id={user_id}
                    datetime={datetime}
                    img_path={img_path}
                    satis={satis}
                    creater_id={creater_id}
                    is_scrap={true}
                    key={daily_id}
                    handleDailysUpdate={handleDailysUpdate}
                />
            )
        )
        return(
            <React.Fragment>
                {myScraps}
            </React.Fragment>
        )
    }
}

export default MyScrap