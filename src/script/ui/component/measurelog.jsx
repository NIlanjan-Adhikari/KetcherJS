import React, { Component } from 'react';
import { connect } from 'react-redux';

class MeasureLog extends Component {
	componentWillReceiveProps(props, oldProps) {
		if (!oldProps.editor && props.editor) {
			props.editor.event.message.add((msg) => {
				if (msg.info) {
					this.base.innerHTML = msg.info;
					this.base.classList.add('visible');
				} else {
					this.base.classList.remove('visible');
				}
			});
		}
	}
	render() {
		return (
			<div className="measure-log" />
		);
	}
}
export default connect(
	state => ({
		editor: state.editor
	})
)(MeasureLog);
