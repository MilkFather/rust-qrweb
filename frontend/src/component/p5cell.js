import './p5cell.css'
import React from 'react'
import p5 from 'p5'


class P5Cell extends React.Component {

	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	Sketch = (p) => {

		p.setup = () => {
			//background(128)
			//p.size(500, 500)
			p.createCanvas(500, 500)
			p.background(this.props.background)
			//p.background(0, 0, 0)
		}
/*
		p.draw = () => {
		...
		}*/
	}

	componentDidMount() {
		this.myP5 = new p5(this.Sketch, this.canvasRef.current)
	}

	render() {
		return (
			<div ref={this.canvasRef}>
			</div>
		);
	}

}

export default P5Cell;