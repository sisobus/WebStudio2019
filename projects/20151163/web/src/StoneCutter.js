import { SpringGrid, CSSGrid, makeResponsive, measureItems,
    layout as layouts, enterExitStyle as enterExitStyles} from 'react-stonecutter';
import './App.css';
import React, { Component } from 'react';
import isEqualWith from 'lodash.isequalwith';


const Grid = makeResponsive(measureItems(CSSGrid), {
    maxWidth: 1920,
    minPadding: 100
  });


export default class extends Component {

    constructor(props) {
        super(props)
        this.state = this.createGrid(props);

        fetch('http://localhost:5000/api/pictures')
            .then(response =>
                response.json().then(rsp =>
                    this.setState({ pictures: rsp })
                )
            )
    }

    componentWillReceiveProps(nextProps) {
        if (
          !isEqualWith(nextProps, this.props, (a, b, key) => {
            if (key === 'children') return true;
          })
        ) {
          this.setState(this.createGrid(nextProps));
        }
      }

    createGrid = ({ useCSS, measured, responsive }) => {
        let Grid = useCSS ? CSSGrid : SpringGrid;

        if (measured) {
            Grid = measureItems(Grid);
    }}

    
    render() {
        const {
            children,
            useCSS,
            responsive,
            layout,
            enterExitStyle,
            duration,
            easing,
            stiffness,
            damping,
            gutters,
            columns,
          } = this.props;
      
          const { Grid } = this.state;
      
          const gridLayout = layouts[layout];
          const gridEnterExitStyle = enterExitStyles[enterExitStyle];

        return (
            <Grid
                className="grid"
                component="ul"
                columns={!responsive ? columns : null}
                columnWidth={150}
                gutterWidth={gutters}
                gutterHeight={gutters}
                layout={gridLayout}
                enter={gridEnterExitStyle.enter}
                entered={gridEnterExitStyle.entered}
                exit={gridEnterExitStyle.exit}
                perspective={600}
                duration={useCSS ? duration : null}
                easing={useCSS ? easing : null}
                springConfig={
                !useCSS && stiffness && damping ? { stiffness, damping } : null
                }
            >
                {children}
                {this.state.pictures.map(obj  => (
                    <li
                        key={obj.src}
                        className="image"
                        style={{ background: 'red'}}
                        >
                        <img src={obj.path} alt={obj.name} style={{ width: "100%", height: "auto"}}></img>
                        {obj.name}
                    </li>
                ))}
            </Grid>
        );
    }
}
