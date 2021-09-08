import React from 'react';
import './editor.css'

class Editor extends React.Component {

	render() {
		return (
			<div className="view-editor">
				<textarea value={this.props.value} onChange={e => {this.props.changeHandle(e)}}></textarea>
			</div>
		);
	}

}

export default Editor;