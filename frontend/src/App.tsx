import React from 'react';
import './App.css';
import { Container, Grid } from '@material-ui/core';

import QueryPanel from './component/querypanel';
import ResultCard from './component/resultcard';

interface AppDataModel {
	text: string,
	encode: string,
	ec: string,
	ver: string,
	foreground: string,
	background: string,
};

class App extends React.Component<{}, AppDataModel> {

	constructor(props: Readonly<{}>) {
		super(props);
		this.state = {
			text: '',
			encode: 'auto',
			ec: 'M',
			ver: 'auto',
			foreground: '#000',
			background: '#fff',
		};
	}

	textChange(e: any) { this.setState({text: e.target.value })}
	encChange(e: any) {this.setState({encode: e.target.value })}
	ecChange(e: any) {this.setState({ec: e.target.value })}
	verChange(e: any) {this.setState({ver: e.target.value })}

	

	render() {
		return (
			<Container maxWidth="md">
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<h1>QR web</h1>
					</Grid>

					<Grid item xs={12} md={6}>
						<QueryPanel
							textChange={ (e: any) => this.textChange(e) }
							encChange={ (e: any) => this.encChange(e) }
							ecChange={ (e: any) => this.ecChange(e) }
							verChange={ (e: any) => this.verChange(e) }
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<ResultCard
							{...this.state}
						/>
					</Grid>
				</Grid>
			</Container>
		);
	}

}

export default App;
export type { AppDataModel };
