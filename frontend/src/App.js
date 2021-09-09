import React from 'react';
import './App.css';
import Editor from './component/editor.js'
import EncodeOptPanel from './component/encodeoptpanel';
import PreviewCell from './component/previewcell';
import { debouncify } from 'utils-decorators';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			text: '',
			encode: 'auto',
			ec: 'M',
			version: 'auto',
			foreground: '#000',
			background: '#fff',

			mat: null,
			msg: '',
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

	updateFg(e) {
		this.setState({
			foreground: e.value
		})
	}

	updateBg(e) {
		this.setState({
			background: e.value
		})
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.text !== prevState.text || this.state.encode !== prevState.encode || this.state.ec !== prevState.ec || this.state.version !== prevState.version) {
			this.debouncedUpdateQRmat()
		}
	}

	componentDidMount() {
		this.debouncedUpdateQRmat()
	}

	updateQRmat() {
		(function(t) {
			let thisText = t.state.text;
			let thisEC = t.state.ec;
			let thisEncode = t.state.encode;
			let thisVersion = t.state.version;

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
				body: JSON.stringify({
					text: thisText,
					encode: thisEncode,
					ec: thisEC,
					version: thisVersion
				})
			}).then(resp => resp.json())
			.then(data => {
				// discard outdated query
				if (t.state.text === thisText || t.state.ec === thisEC || t.state.encode === thisEncode || t.state.version === thisVersion) {
					if (data.success === true) {
						t.setState({
							mat: data.result.matrix,
							msg: '',
						});
					} else {
						t.setState({
							mat: null,
							msg: data.result
						});
					}
				}
			})
			.catch(e => {
				// discard outdated querys
				if (t.state.text === thisText || t.state.ec === thisEC || t.state.encode === thisEncode || t.state.version === thisVersion) {
					t.setState({
						mat: null,
						msg: e.toString()
					});
				}
			})
		})(this);
	}

	debouncedUpdateQRmat = debouncify(this.updateQRmat, 200)

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
				<PreviewCell
					foreground={this.state.foreground}
					background={this.state.background}
					mat={this.state.mat}
					msg={this.state.msg}
				/>
			</div>
		);
	}

}

export default App;
