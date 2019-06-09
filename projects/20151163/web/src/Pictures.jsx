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
        const { width } = this.props.size
      
        return (
            /*<div className="picture-container">*/
                <StackGrid
                    monitorImagesLoaded
                    /*columnWidth={300}*/
                    columnWidth={width <= 300 ? '100%' : '20%'}
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
                            key={obj.path}
                            className="image"
                            style={{ background: 'white'}}>
                            <img src={obj.path} alt={obj.name} style={{ width: "100%", height: "auto"}}></img>
                            <figcaption className= "subtext capitalize" >{obj.name}</figcaption>
                        </figure>
                    ))}
                </StackGrid>
        );
    }
}

export default sizeMe() (Pictures);