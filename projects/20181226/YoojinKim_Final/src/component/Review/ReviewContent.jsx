import React from 'react';
import './ReviewContent.css';

class ReviewContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: []
    }

    fetch('http://localhost:5000/api/visuals', {
      headers: {
        'content-type': 'application/json',
      },
    }).then(response => response.json())
      .then(images => this.setState({ images }))
  }

  render() {
    return (
      <div className="visual-container">
        <div>
          <div className="visual-image-container">
            <div class="visual-image">
              {this.state.images &&
                this.state.images.map((images) => (
                    <div>
                    title={images.title}
                    image={images.image} 
                    </div>
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

export default ReviewContent