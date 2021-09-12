import { AppDataModel } from "../App";
import React from "react";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'
import { debouncify } from 'utils-decorators';

import PreviewCell from './previewcell';

interface QueryJSON {
	text: string,
	encode: string,
	ec: string,
	version: string
}

interface ResultJSONResult {
	encode_mode: string,
	error_correction_level: string,
	version: string,
	matrix: [[number]],
}

interface ResultJSON {
	code: number,
	success: boolean,
	result: string | ResultJSONResult,
}

interface ResultPaperState {
	json?: ResultJSON,
	err?: string,
	query: string,
}

const cardStyle = makeStyles({
	
})

class ResultCard extends React.Component<AppDataModel, ResultPaperState> {

	constructor(props: Readonly<AppDataModel>) {
		super(props)
		this.state = {
			json: undefined,
			err: 'Not initialized',
			query: '',
		}
	}

	componentDidUpdate(prevProps: Readonly<AppDataModel>, prevState: Readonly<ResultPaperState>): void {
		if (this.props.text !== prevProps.text || this.props.encode !== prevProps.encode || this.props.ec !== prevProps.ec || this.props.ver !== prevProps.ver) {
			this.debouncedUpdateQRmat()
		}
	}

	componentDidMount(): void {
		this.debouncedUpdateQRmat()
	}

	debouncedUpdateQRmat = debouncify(this.updateQRmat, 200)

	updateQRmat() {
		((_prop: Readonly<AppDataModel>) => {
			let prop: Readonly<AppDataModel> = _prop;
			let queryjson: QueryJSON = {
				text: prop.text,
				encode: prop.encode,
				ec: prop.ec,
				version: prop.ver
			};

			fetch('/api/qr/req', {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				},
				redirect: 'follow',
				referrerPolicy: 'no-referrer',
				body: JSON.stringify(queryjson)
			}).then(resp => resp.json())
			.then((data: ResultJSON) => {
				// discard outdated query
				if (this.props.text === prop.text || this.props.encode === prop.encode || this.props.ec === prop.ec || this.props.ver === prop.ver) {
					this.setState({json: data, err: undefined, query: prop.text});
				}
			})
			.catch(e => {
				// discard outdated querys
				if (this.props.text === prop.text || this.props.encode === prop.encode || this.props.ec === prop.ec || this.props.ver === prop.ver) {
					this.setState({json: undefined, err: e.toString(), query: prop.text});
				}
			})
		})(this.props);
	}

	render() {
		return (
			<Paper >
				{(()=>{
					if (this.state.json !== undefined) {
						if (this.state.json.success) {
							return (
								<Grid container spacing={0}>
								<Grid item xs={12}>
									<PreviewCell
									matrix={(this.state.json.result as ResultJSONResult).matrix}
									foreground={this.props.foreground}
									background={this.props.background}
									/>
								</Grid>
								<Grid item xs={12}>
									{this.state.query}
								</Grid>
								</Grid>
							);
						} else {
							return (<div>{this.state.json.result as string}</div>);
						}
					} else {
						return (<div>{this.state.err}</div>);
					}
				})()}
			</Paper>
		);
	}

}

export default ResultCard;