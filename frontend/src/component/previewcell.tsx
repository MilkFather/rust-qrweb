import { makeStyles } from "@material-ui/core/styles"

interface DrawBoardProps {
	matrix: [[number]],
	foreground: string,
	background: string,
}

const svgStyles = makeStyles({
	svgRoot: {
		maxWidth: '450px',
		maxHeight: '450px',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
})

export default function PreviewCell(props: DrawBoardProps) {
	let silzone = 4;
	let bitw = 10;
	let dillute = 0.2;

	const styles = svgStyles();
	return (
		<div className={styles.svgRoot}>
			<svg viewBox={`${-silzone*bitw} ${-silzone*bitw} ${(props.matrix[0].length+2*silzone)*bitw} ${(props.matrix[0].length+2*silzone)*bitw}`}>
				<style>{
					`rect.p{fill:${props.foreground};transition:fill .1s linear;}` +
					`rect.n{fill:${props.background};transition:fill .1s linear;}`
				}</style>
				<rect x={-silzone*bitw} y={-silzone*bitw} width={(props.matrix[0].length+2*silzone)*bitw} height={(props.matrix[0].length+2*silzone)*bitw} className="n"/>
				{props.matrix.map((row, py) => {
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
};