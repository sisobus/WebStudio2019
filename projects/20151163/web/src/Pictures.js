import React from 'react';
import StackGrid, { transitions, easings } from "react-stack-grid";
import './App.css';
import sizeMe from 'react-sizeme';

const transition = transitions.scaleDown;

class Pictures extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            pictures: []
        }

        fetch('http://localhost:5000/api/pictures')
            .then(response =>
                response.json().then(rsp =>
                    this.setState({ pictures: rsp })
                )
            )
    }

    

    render() {
        /*const { 
            size: { 
              width
            } 
          } = this.props;*/
        const { width } = this.props.size
      
        return (
            /*<div className="picture-container">*/
                <StackGrid
                    monitorImagesLoaded
                    columnWidth={ width <= 768 ? '100%' : '33.33%'}
                    duration={600}
                    gutterWidth={15}
                    gutterHeight={15}
                    easing={easings.cubicOut}
                    appearDelay={60}
                    appear={transition.appear}
                    appeared={transition.appeared}
                    enter={transition.enter}
                    entered={transition.entered}
                    leaved={transition.leaved}
                >}
                    {this.state.pictures.map(obj  => (
                        <figure
                            key={obj.src}
                            className="image"
                        >
                            <img max-width= '100%' height= 'auto' vertical-align= 'top' src={obj.path} alt={obj.name}></img>
                        </figure>
                    ))}
                </StackGrid>
                    /*<div className="Wall">
                        {this.state.pictures &&
                            this.state.pictures.map((picture, idx) => (
                                <Picture
                                    title={picture.name}
                                    src={picture.path}
                                />
                            ))
                        }
            /*</div>*/
        );
    }
}

/*
class Picture extends React.Component {
    render() {
        return (
            <span className='PictureBlock'>
                <figure className="image">
                    <div className='img'>
                        <img src={this.props.src} alt="Images"></img>
                    </div>
                </figure>
            </span>
        )
    }
}
*/
export default sizeMe() (Pictures);