import React from 'react'
import { Button, Select, message } from 'antd'
import { Link } from "react-router-dom"
import { getUser } from "../authentication"
import axios from 'axios'
import { history } from './history'
import IconSlider from './IconSlider'

const { Option } = Select;

class UploadPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            USER: getUser(),
            selectedFile : null,
            uploadedFileName: '',
            dt: '',
            satis : 2,
            city: 'Seoul'
        }
    }

    fileSelectedHandler = (e) =>{
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    fileUploadHandler=()=>{
        const {USER, selectedFile, satis, city} = this.state
        const url = 'http://54.180.147.246:8080/daily/' + USER.id
        const fd = new FormData()

        if(!this.state.selectedFile){
            message.error('no selected file')
            return
        }

        fd.append('image', selectedFile, selectedFile.name)
        axios.post(url + '/image-upload',fd)  // image upload to s3
        .then(response => {
            console.log(response.data.message)
            return JSON.stringify({
                dt: response.data.dt,
                satis: satis,
                file_name: response.data.filename,
                city: city
            })
        })
        .then(data=>{
            fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: data
            })
        })
        .then(history.push('/main'))
        .catch(error => {
            message.error(error)
        })
    }

    handleSatisChange =(value) =>{this.setState({satis: value})}

    onSelectChange=(value)=>{this.setState({city:value})}

    render(){
        return(
            <div className="upload-container">
                <h1>Upload your Daily Look</h1>
                <Link to="/main">
                    <Button type="default" className="btn-upload" block>Back</Button>
                </Link>

                <input 
                    type="file" 
                    onChange={this.fileSelectedHandler}
                />
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Seoul"
                    optionFilterProp="children"
                    onChange={this.onSelectChange}
                    filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="Seoul">Seoul</Option>
                </Select>
                
                <IconSlider min={1} max={3} handleSatisChange={this.handleSatisChange}/>
                <Button onClick={this.fileUploadHandler}>Upload</Button>
            </div>
        )
    }
}

export default UploadPage