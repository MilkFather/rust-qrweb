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
			p.createCanvas(500, 500)
			p.background(this.props.background)
		}

		p.draw = () => {
			(() => {
				let cachedMat = this.props.mat;
				let cachedFg = this.props.foreground;
				let cachedBg = this.props.background;
				p.background(cachedBg);
				if (cachedMat !== null) {
					// do actual pixel rendering
					let xbits = cachedMat[0].length;
					let ybits = cachedMat.length;
					for (let y = 0; y < ybits; y += 1) {
						for (let x = 0; x < xbits; x += 1) {
							if (cachedMat[y][x] === 1) {
								p.rectMode(p.CORNERS);
								p.fill(cachedFg);
								p.rect(x * p.width / xbits, y * p.height / ybits, (x + 1) * p.width / xbits, (y + 1) * p.height / ybits);
							}
						}
					}
				}
			})()
		}
	}

	componentDidMount() {
		this.myP5 = new p5(this.Sketch, this.canvasRef.current)
	}

	render() {
		return (
			<div ref={this.canvasRef}>
				{this.props.mat === null &&
					<div className='p5errmsg'>
						{this.props.msg}
					</div>
				}
			</div>
		);
	}

}

export default P5Cell;