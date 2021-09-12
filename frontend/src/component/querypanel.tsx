import React from "react";
import { Grid, FormControl, InputLabel, TextField, Select, ListSubheader, MenuItem } from "@material-ui/core";

interface AppDataChangeHandlerModel {
	textChange: any,
	encChange: any,
	ecChange: any,
	verChange: any,
}

class QueryPanel extends React.Component<AppDataChangeHandlerModel, {}> {

	render() {
		return(
			<Grid container spacing={3}>
			<Grid item xs={12}>
				<TextField id="outlined-basic" multiline fullWidth label="Text" variant="outlined" onChange={e => this.props.textChange(e)} />
			</Grid>
			<Grid item xs={12} md={4}>
				<FormControl fullWidth variant="outlined">
					<InputLabel id="enc-select-label">Encoding</InputLabel>
					<Select labelId="enc-select-label" id="enc-select" defaultValue="auto" onChange={e => this.props.encChange(e)} label="Encoding" >
						<MenuItem key="enc_auto" value="auto">Automatic</MenuItem>
						<ListSubheader>Manual</ListSubheader>
						<MenuItem key="enc_num" value="numeric">Numeric</MenuItem>
						<MenuItem key="enc_alpha" value="alphanumeric">Alphanumeric</MenuItem>
						<MenuItem key="enc_byte" value="byte">Byte</MenuItem>
						<MenuItem key="enc_kanji" value="kanji">Kanji</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12} md={4}>
				<FormControl fullWidth variant="outlined">
					<InputLabel id="ec-select-label">Error Correction</InputLabel>
					<Select labelId="ec-select-label" id="ec-select" defaultValue="M" onChange={e => this.props.ecChange(e)} label="Error Correction" >
						<MenuItem key="ec_l" value="L">L</MenuItem>
						<MenuItem key="ec_m" value="M">M</MenuItem>
						<MenuItem key="ec_q" value="Q">Q</MenuItem>
						<MenuItem key="ec_h" value="H">H</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12} md={4}>
				<FormControl fullWidth variant="outlined">
					<InputLabel id="ver-select-label">Version</InputLabel>
					<Select labelId="ver-select-label" id="ver-select" defaultValue="auto" onChange={e => this.props.verChange(e)} label="Version" >
						<MenuItem key="ver_auto" value="auto">Automatic</MenuItem>
						<ListSubheader>Manual</ListSubheader>
						{
							[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40].map((v) => <MenuItem key={"ver_"+v} value={v.toString()}>{v.toString()}</MenuItem>)
						}
					</Select>
				</FormControl>
			</Grid>
			</Grid>
		);
	}

}

export default QueryPanel;