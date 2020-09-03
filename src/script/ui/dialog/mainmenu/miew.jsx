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
import { connect } from 'react-redux';
import { pick } from 'lodash/fp';

import Dialog from '../../component/dialog';
import * as structFormat from '../../data/convert/structformat';
import { MIEW_OPTIONS } from '../../data/schema/options-schema';
import { load } from '../../state';
import HelperApiContext from '../../context/HelperApiContext';

/* OPTIONS for MIEW */
const BACKGROUND_COLOR = {
	dark: '0x202020',
	light: '0xcccccc'
};

const MIEW_TX_TYPES = {
	no: null,
	bright: {
		colorer: 'EL'
	},
	blackAndWhite: {
		colorer: ['UN', { color: 0xFFFFFF }],
		bg: '0x000'
	},
	black: {
		colorer: ['UN', { color: 0x000000 }]
	}
};

const TXoptions = (userOpts) => {
	const type = userOpts.miewAtomLabel;
	if (MIEW_TX_TYPES[type] === null) return null;
	return {
		colorer: MIEW_TX_TYPES[type].colorer,
		selector: 'not elem C',
		mode: ['TX', {
			bg: MIEW_TX_TYPES[type].bg || BACKGROUND_COLOR[userOpts.miewTheme],
			showBg: true,
			template: '{{elem}}'
		}]
	};
};

function createMiewOptions(userOpts) {
	const options = {
		settings: {
			theme: userOpts.miewTheme,
			autoPreset: false,
			editing: true,
			inversePanning: true
		},
		reps: [{
			mode: userOpts.miewMode
		}]
	};

	const textMode = TXoptions(userOpts);
	if (textMode) options.reps.push(textMode);

	return options;
}
/* ---------------- */
const CHANGING_WARNING = 'Stereocenters can be changed after the strong 3D rotation';

class MiewComponent extends Component {
	static contextType = HelperApiContext;

	componentDidMount() {
		const { struct, miewOpts } = this.props;
		const Miew = window.Miew;

		this.helperApi = this.context;

		this.viewer = new Miew({
			container: this.miewContainer
		});

		if (this.viewer.init())
			this.viewer.run();

		structFormat.toString(struct, 'cml', this.helperApi)
			.then(res => this.viewer.load(res, { sourceType: 'immediate', fileType: 'cml' }))
			.then(() => this.viewer.setOptions(miewOpts))
			.catch(ex => console.error(ex.message));
	}

	exportCML() {
		const cmlStruct = this.viewer.exportCML();
		this.props.onExportCML(cmlStruct);
	}

	render() {
		const { miewOpts, struct, ...prop } = this.props;

		return (
			<Dialog
				title="Miew"
				className="miew"
				params={prop}
				buttons={[
					<div className="warning">{CHANGING_WARNING}</div>,
					'Close',
					<button onClick={() => this.exportCML()}>
						Apply
					</button>
				]}
			>
				<div
					ref={(el) => { this.miewContainer = el; }}
					className="miew-container"
					style={{ width: '1024px', height: '600px', position: 'relative' }}
				/>
			</Dialog>
		);
	}
}

export default connect(
	store => ({
		miewOpts: createMiewOptions(pick(MIEW_OPTIONS, store.options.settings)),
		struct: store.editor.struct()
	}),
	(dispatch, props) => ({
		onExportCML: (cmlStruct) => {
			dispatch(load(cmlStruct));
			props.onOk();
		}
	})
)(MiewComponent);
