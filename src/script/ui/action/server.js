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

import { serverTransform } from '../state/server'; // TODO OK

export default {
	layout: {
		shortcut: 'Mod+l',
		title: 'Layout',
		action: {
			thunk: serverTransform('layout')
		},
		disabled: (_, __, options) => !options.app.helperApi || !options.app.helperApi.ready
	},
	clean: {
		shortcut: 'Mod+Shift+l',
		title: 'Clean Up',
		action: {
			thunk: serverTransform('clean')
		},
		disabled: (_, __, options) => !options.app.helperApi || !options.app.helperApi.ready
	},
	arom: {
		title: 'Aromatize',
		action: {
			thunk: serverTransform('aromatize')
		},
		disabled: (_, __, options) => !options.app.helperApi || !options.app.helperApi.ready
	},
	dearom: {
		title: 'Dearomatize',
		action: {
			thunk: serverTransform('dearomatize')
		},
		disabled: (_, __, options) => !options.app.helperApi || !options.app.helperApi.ready
	},
	cip: {
		shortcut: 'Mod+p',
		title: 'Calculate CIP',
		action: {
			thunk: serverTransform('calculateCip')
		},
		disabled: (_, __, options) => !options.app.helperApi || !options.app.helperApi.ready
	},
	check: {
		title: 'Check Structure',
		action: { dialog: 'check' },
		disabled: (_, __, options) => !options.app.helperApi || !options.app.helperApi.ready
	},
	analyse: {
		title: 'Calculated Values',
		action: { dialog: 'analyse' },
		disabled: (_, __, options) => !options.app.helperApi || !options.app.helperApi.ready
	},
	recognize: {
		title: 'Recognize Molecule',
		action: { dialog: 'recognize' },
		disabled: (_, __, options) => !options.app.helperApi || !options.app.helperApi.ready
	},
	miew: {
		title: '3D Viewer',
		action: { dialog: 'miew' },
		disabled: () => !window.Miew
	}
};
