import React from 'react';
import './App.css';
import Editor from './component/editor.js'
import EncodeOptPanel from './component/encodeoptpanel';
import P5Cell from './component/p5cell';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			text: '',
			encode: 'auto',
			ec: 'M',
			version: 'auto',
			foreground: [0, 0, 0],
			background: [0, 255, 255],
		};
	}

	updateText(e) {
		this.setState({
			text: e.target.value
		});
	}

	updateEncode(e) {
		this.setState({
			encode: e.value
		});
	}

	updateEC(e) {
		this.setState({
			ec: e.value
		});
	}

	updateVersion(e) {
		this.setState({
			version: e.value
		});
	}

	render() {
		return (
			<div className = "view-main">
				<Editor
					value={this.state.text}
					changeHandle={(e) => this.updateText(e)}
				/>
				<EncodeOptPanel
					updateencodehandle={(e) => this.updateEncode(e)}
					updateechandle={(e) => this.updateEC(e)}
					updateversionhandle={(e) => this.updateVersion(e)}
				/>
				<P5Cell
				foreground={this.state.foreground}
				background={this.state.background}
				/>
			</div>
		);
	}

}

export default App;
