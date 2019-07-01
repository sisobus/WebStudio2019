import React from 'react'
import Daily from './Daily'

class OtherDaily extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            'dailys': this.props.dailys
        }
    }

    handleDailysUpdate=(daily_id, is_scrap)=>{
        let put_dailys = this.state.dailys
        this.setState({ 
            'dailys': put_dailys
        })
    }

    render(){
        const {dailys} = this.state
        const {user_id} = this.props
        const {handleDailysUpdate} = this

        const otherDailys = dailys.map(
            ({id, datetime, img_path, satis}) => (
                <Daily
                    daily_id={id}
                    user_id={user_id}
                    datetime={datetime}
                    img_path={img_path}
                    satis={satis}
                    is_scrap={false}
                    key={id}
                    handleDailysUpdate={handleDailysUpdate}
                />
            )
        )

        return(
            <React.Fragment>
                {otherDailys}
            </React.Fragment>
        )
    }
}

export default OtherDaily