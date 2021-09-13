import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'


import { ResultCardModel, ResultJSONResult } from "../interface";
import PreviewCell from './previewcell';

const paperStyles = makeStyles({
	paper_root: {
		transition: 'height 200ms linear 0s',
	},
	echo_div: {
		display: 'block',
		width: '100%',
		textAlign: 'center',
		margin: '-0.5rem 0 1rem 0',
		padding: '0 1rem 0 1rem',
		wordWrap: 'break-word',
	},
	err_div: {
		display: 'block',
		textAlign: 'center',
		padding: '3rem 2rem 3rem 2rem',
		fontSize: '130%',
		color: 'red',
	},
})

export default function ResultCard(props: ResultCardModel) {
	const classes = paperStyles();
	return (
		<Paper className={classes.paper_root}>
			{(()=>{
				if (props.json !== undefined) {
					if (props.json.success) {
						return (
							<Grid container spacing={0}>
							<Grid item xs={12}>
								<PreviewCell
								matrix={(props.json.result as ResultJSONResult).matrix}
								silzone={props.silzone}
								bitw={props.bitw}
								dilate={props.dilate}
								/>
							</Grid>
							<Grid className={classes.echo_div} item xs={12}>
								{props.query}
							</Grid>
							</Grid>
						);
					} else {
						return (<div className={classes.err_div}>{props.json.result as string}</div>);
					}
				} else {
					return (<div className={classes.err_div}>{props.err}</div>);
				}
			})()}
		</Paper>
	);
}