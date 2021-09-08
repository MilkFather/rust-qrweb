import './dropdowncell.css'
import React from 'react';
import Select from 'react-select'

class DropDownCell extends React.Component {

	render() {
		return (
			<Select
				defaultValue={this.props.options[this.props.defaultvalueindex]}
				options={this.props.options}
				onChange={(e) => this.props.onchange(e)}
			/>
		);
	}

}

export default DropDownCell;