import './encodeoptpanel.css'
import React from 'react';
import DropDownCell from './dropdowncell';

class EncodeOptPanel extends React.Component {

	constructor(props) {
		super(props);
		this.encodeopt = [
			{value: "auto", label: "Automatic"},
			{value: "numeric", label: "Numeric"},
			{value: "alphanumeric", label: "Alphanumeric"},
			{value: "byte", label: "Byte"},
			{value: "kanji", label: "Kanji"},
		];
		this.ecopt = [
			{value: "l", label: "L"},
			{value: "m", label: "M"},
			{value: "q", label: "Q"},
			{value: "h", label: "H"},
		]
		this.veropt = [
			{value: "auto", label: "Automatic"},
		]
		for (let i = 1; i <= 40; i++) {
			this.veropt.push(
				{value: i.toString(10), label: i.toString(10)}
			)
		}
	}

	render() {
		return (
			<ul>
				<li>
					<DropDownCell
						defaultvalueindex={0}
						options={this.encodeopt}
						onchange={(e) => this.props.updateencodehandle(e)}
					/>
				</li>
				<li>
					<DropDownCell
						defaultvalueindex={1}
						options={this.ecopt}
						onchange={(e) => this.props.updateechandle(e)}
				/>
				</li>
				<li>
					<DropDownCell
						defaultvalueindex={0}
						options={this.veropt}
						onchange={(e) => this.props.updateversionhandle(e)}
					/>
				</li>
			</ul>

		);
	}

}

export default EncodeOptPanel;