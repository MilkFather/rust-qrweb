import { makeStyles } from "@material-ui/core/styles"
import { DrawBoardProps } from "../interface";

const svgStyles = makeStyles({
	svgRoot: {
		maxWidth: '450px',
		maxHeight: '450px',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
})

export default function PreviewCell(props: DrawBoardProps) {
	const styles = svgStyles();
	return (
		<div className={styles.svgRoot}>
			<svg viewBox={`${-props.silzone*props.bitw} ${-props.silzone*props.bitw} ${(props.matrix[0].length+2*props.silzone)*props.bitw} ${(props.matrix.length+2*props.silzone)*props.bitw}`}>
				<style>{
					`rect.p{fill:#000000;}` +
					`rect.n{fill:#ffffff;}`
				}</style>
				<rect x={-props.silzone*props.bitw} y={-props.silzone*props.bitw} width={(props.matrix[0].length+2*props.silzone)*props.bitw} height={(props.matrix.length+2*props.silzone)*props.bitw} className="n"/>
				{props.matrix.map((row, py) => {
					return row.map((cell, px) => {
						return (cell === 1)
							? 
							<rect x={px*props.bitw-props.dilate} y={py*props.bitw-props.dilate} width={props.bitw+2*props.dilate} height={props.bitw+2*props.dilate} className="p" key={px+"_"+py} />
							:
							null
					})
				})}
			</svg>
		</div>
	);
};