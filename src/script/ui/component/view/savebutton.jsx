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
import fs from 'filesaver.js';

function saveFile(data, filename, type) {
	const blob = new window.Blob([data], { type });
	fs.saveAs(blob, filename);
}

class SaveButton extends Component {
	save(ev) {
		const noop = () => null;
		const { filename = 'unnamed', data, type = 'text/plain', onSave = noop, onError = noop } = this.props;

		if (data) {
			try {
				saveFile(data, filename, type);
				onSave();
			} catch (e) {
				onError(e);
			}
		}

		ev.preventDefault();
	}

	render() {
		const { children, filename, data, className = 'save-button', onSave, ...props } = this.props;

		return (
			<button
				onClick={ev => this.save(ev)}
				className={!data ? `disabled ${className}` : className}
				{...props}
			>
				{children}
			</button>
		);
	}
}

export default SaveButton;
