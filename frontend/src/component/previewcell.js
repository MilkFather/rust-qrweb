import './previewcell.css'
import React from 'react'

class PreviewCell extends React.Component {

	render() {
		let silzone = 4;
		let bitw = 10;
		return (
			<div className="svgimg">
				{this.props.mat === null
					?
					<div className='svgerrmsg'>
						{this.props.msg}
					</div>
					:
					<svg viewBox={`${-silzone*bitw} ${-silzone*bitw} ${(this.props.mat[0].length+2*silzone)*bitw} ${(this.props.mat[0].length+2*silzone)*bitw}`}>
						<style>{
							`rect.p{fill:${this.props.foreground};transition:fill .05s linear;}` +
							`rect.n{fill:${this.props.background};transition:fill .05s linear;}`
						}</style>
						<rect x={-silzone*bitw} y={-silzone*bitw} width={(this.props.mat[0].length+2*silzone)*bitw} height={(this.props.mat[0].length+2*silzone)*bitw} className="n"/>
						{this.props.mat.map((row, py) => {
							return row.map((cell, px) => {
								return (cell === 1)
									? 
									<rect x={px*10 + ""} y={py*10 + ""} width="10" height="10" className="p" key={px+"_"+py} />
									:
									null
							})
						})}
					</svg>
				}
			</div>
		);
	}

}

export default PreviewCell;