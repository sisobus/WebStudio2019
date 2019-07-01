import React from 'react';
import './VisualContent.css';
import Popup from './Popup';
import image1 from '../BWR.svg';
import image2 from '../BLSG.svg';
import image3 from '../406project.svg';


class VisualContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [
        {title: "벤치위레오 인터뷰",
        image: image1,},
        {title: "분리수거 인터뷰",
          image: image2,},
        {title: "406호 프로젝트 인터뷰",
          image: image3,},
      ]
    }

  //   fetch('http://localhost:5000/api/visuals', {
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //   }).then(response => response.json())
  //     .then(images => this.setState({ images }))
 }

  render() {
    return (
      <div className="visual-container">
        <div>
          <div className="visual-image-container">
            <div class="visual-image">
              {this.state.images &&
                this.state.images.map((images) => (
                  <Popup
                    title={images.title}
                    image={images.image} />
                ))}
            </div>
          </div>
          <div className="video-container">
          </div>
        </div>
      </div>
    )
  }
}

export default VisualContent