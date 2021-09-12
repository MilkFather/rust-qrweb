import './previewcell.css'
import React from 'react'

interface DrawBoardProps {
	matrix: [[number]],
	foreground: string,
	background: string,
}

class PreviewCell extends React.Component<DrawBoardProps, {}> {

	render() {
		let silzone = 4;
		let bitw = 10;
		let dillute = 0.2;
		return (
			<div className="svgimg">
				<svg viewBox={`${-silzone*bitw} ${-silzone*bitw} ${(this.props.matrix[0].length+2*silzone)*bitw} ${(this.props.matrix[0].length+2*silzone)*bitw}`}>
					<style>{
						`rect.p{fill:${this.props.foreground};transition:fill .1s linear;}` +
						`rect.n{fill:${this.props.background};transition:fill .1s linear;}`
					}</style>
					<rect x={-silzone*bitw} y={-silzone*bitw} width={(this.props.matrix[0].length+2*silzone)*bitw} height={(this.props.matrix[0].length+2*silzone)*bitw} className="n"/>
					{this.props.matrix.map((row, py) => {
						return row.map((cell, px) => {
							return (cell === 1)
								? 
								<rect x={px*bitw-dillute} y={py*bitw-dillute} width={bitw+2*dillute} height={bitw+2*dillute} className="p" key={px+"_"+py} />
								:
								null
						})
					})}
				</svg>
			</div>
		);
	}

}

export default PreviewCell;