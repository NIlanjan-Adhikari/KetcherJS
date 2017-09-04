/****************************************************************************
 * Copyright (C) 2017 EPAM Systems
 *
 * This file is part of the Ketcher
 * The contents are covered by the terms of the BSD 3-Clause license
 * which is included in the file LICENSE.md, found at the root
 * of the Ketcher source tree.
 ***************************************************************************/

import { h, Component } from 'preact';
/** @jsx h */

const ieCb = window.clipboardData;

class ClipArea extends Component {
	shouldComponentUpdate() {
		return false;
	}

	componentDidMount() {
		const el = this.refs ? this.refs.base : this.base;
		const target = this.props.target || el.parentNode;
		const self = this;

		// TODO: remove event listeners on unmount or
		//       target change
		target.addEventListener('mouseup', () => {
			if (self.props.focused())
				autofocus(el);
		});

		['copy', 'cut'].forEach(en => {
			let cb = (en === 'copy') ? 'onCopy' : 'onCut';
			target.addEventListener(en, event => {
				if (self.props.focused() && self.props[cb]) {
					const data = self.props[cb]();
					if (data)
						copy(event.clipboardData, data);
					event.preventDefault();
				}
			});
		});

		target.addEventListener('paste', event => {
			if (self.props.focused() && self.props.onPaste) {
				const data = paste(event.clipboardData,
								 self.props.formats);
				if (data)
					self.props.onPaste(data);
				event.preventDefault();
			}
		});
	}

	render () {
		return (
			<textarea className="cliparea" contentEditable={true}
			   autoFocus={true}/>
		);
	}
}

function autofocus(cliparea) {
	cliparea.value = ' ';
	cliparea.focus();
	cliparea.select();
}

function copy(cb, data) {
	if (!cb && ieCb) {
		ieCb.setData('text', data['text/plain']);
	} else {
		cb.setData('text/plain', data['text/plain']);
		try {
			Object.keys(data).forEach(function (fmt) {
				cb.setData(fmt, data[fmt]);
			});
		} catch (ex) {
			console.info('Could not write exact type', ex);
		}
	}
}

function paste(cb, formats) {
	let data = {};
	if (!cb && ieCb) {
		data['text/plain'] = ieCb.getData('text');
	} else {
		data['text/plain'] = cb.getData('text/plain');
		data = formats.reduce(function (data, fmt) {
			const d = cb.getData(fmt);
			if (d)
				data[fmt] = d;
			return data;
		}, data);
	}
	return data;
}

export const actions = ['cut', 'copy', 'paste'];

export function exec(action) {
	let enabled = document.queryCommandSupported(action);
	if (enabled) try {
		enabled = document.execCommand(action);
	} catch (ex) {
		// FF < 41
		enabled = false;
	}
	return enabled;
}

export default ClipArea;