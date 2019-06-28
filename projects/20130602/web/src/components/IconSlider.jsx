import React from 'react'
import { Slider, Icon } from 'antd';
import './IconSlider.css'

class IconSlider extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            value: 2
        }
    }

    handleChange = (value) => {
        const {handleSatisChange} = this.props
        this.setState({ value: value })
        handleSatisChange(value)
    }

  render() {
    const { max, min } = this.props;
    const { value } = this.state;
    const mid = ((max - min) / 2).toFixed(5);
    const preColor = max >= mid ? '' : 'rgba(0, 0, 0, .45)';
    const nextColor = max >= mid ? 'rgba(0, 0, 0, .45)' : '';

    return (
      <div className="icon-wrapper">
        <Icon style={{ color: preColor }} type="frown-o" />
        <Slider {...this.props} onChange={this.handleChange} value={value} />
        <Icon style={{ color: nextColor }} type="smile-o" />
      </div>
    )
  }
}
export default IconSlider