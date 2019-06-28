import React from 'react'
import { Card, Icon, message } from 'antd'
import './Daily.css'
import * as util from '../util'

const { Meta } = Card;

class Daily extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            'is_scrap':this.props.is_scrap,
        }
    }

    handleScrap=(user_id, daily_id) =>{
        const {handleDailysUpdate} = this.props
        // console.log(daily_id)
        // console.log('handleScrap before', this.state.is_scrap )

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                daily_id: daily_id,
            })
        }
        const base = 'http://54.180.147.246:8080/user/'
        fetch(base+user_id+'/myscrap', requestOptions)
        .then(util.handleResponse)
        .then(response => {
            message.success(response.message)
            this.setState({
                'is_scrap': !this.state.is_scrap
            })
        })
        .then(()=>{
            // console.log('fetch then',this.state.is_scrap )
            handleDailysUpdate(daily_id, !this.state.is_scrap)
        })
        .catch(error => {
            message.error(error)
        })
    }

    render(){
        const {daily_id, user_id, datetime, img_path, satis} = this.props
        const {is_scrap} = this.state
        const {handleScrap} = this

        return(
            <div className="card-container">
                <Card
                    cover={
                        <img
                            className="img"
                            alt="dailylook"
                            id={daily_id}
                            src={img_path}
                            onClick={(e)=>{
                                const el = document.getElementById({daily_id}.daily_id)
                                if(el.style.maxWidth !== "100%"){
                                    el.setAttribute("style", "max-width: 100%")
                                }
                                else{
                                    el.setAttribute("style", "max-width: 300px")
                                }
                            }}
                        />
                    }
                    actions= {
                        (!this.props.is_mine&&
                            (is_scrap&&[<Icon 
                                            type="heart" 
                                            theme="filled"
                                            onClick={(e)=>{
                                                e.preventDefault()
                                                e.stopPropagation()
                                                handleScrap(user_id, daily_id)}}/>,]
                            ||
                            !is_scrap&&[<Icon 
                                            type="heart"
                                            onClick={(e)=>{
                                                e.preventDefault()
                                                e.stopPropagation()
                                                handleScrap(user_id, daily_id)}}/>,]
                            )
                        )
                    }
                > 
                    <Meta
                        title={datetime}
                        description={
                            this.props.is_mine&&
                            (    
                            (satis===3)&& <Icon type="smile"/>
                            ||
                            (satis===1)&& <Icon type="frown"/>
                            )
                            }
                    />
                </Card>
            </div>
        )
    }
}

export default Daily;