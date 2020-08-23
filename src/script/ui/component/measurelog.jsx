import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';

class MeasureLog extends Component {
	baseRef = createRef();

	// TODO Remove this unsafe method it's deprecated
	// eslint-disable-next-line camelcase
	UNSAFE_componentWillReceiveProps(props, oldProps) {
		if (!oldProps.editor && props.editor) {
			props.editor.event.message.add((msg) => {
				if (msg.info) {
					// TODO Remove this code, it mustn't touch the DOM directly
					this.baseRef.current.innerHTML = msg.info;
					this.baseRef.current.classList.add('visible');
				} else {
					this.baseRef.current.classList.remove('visible');
				}
			});
		}
	}
	render() {
		return (
			<div ref={this.baseRef} className="measure-log" />
		);
	}
}
export default connect(
	state => ({
		editor: state.editor
	})
)(MeasureLog);
