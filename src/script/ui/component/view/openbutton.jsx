/****************************************************************************
 * Copyright 2018 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ***************************************************************************/

import React, { Component } from 'react';

function openFile(file) {
	return new Promise((resolve, reject) => {
		const rd = new FileReader(); // eslint-disable-line no-undef

		rd.onload = () => {
			const content = rd.result;
			if (file.msClose)
				file.msClose();
			resolve(content);
		};

		rd.onerror = (event) => {
			reject(event);
		};

		rd.readAsText(file, 'UTF-8');
	});
}

class OpenButton extends Component {
	open(ev) {
		const files = ev.target.files;
		const noop = () => null;
		const { onLoad = noop, onError = noop } = this.props;

		if (files.length)
			openFile(files[0]).then(onLoad, onError);

		ev.target.value = null;
		ev.preventDefault();
	}

	render() {
		const { children, type, server, className = 'open-button', ...props } = this.props;

		return (
			<button onClick={() => this.btn.click()} className={className} {...props}>
				<input
					onChange={ev => this.open(ev)}
					accept={type}
					type="file"
					ref={(el) => { this.btn = el; }}
				/>
				{children}
			</button>
		);
	}
}

export default OpenButton;
