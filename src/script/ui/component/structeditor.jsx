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

import { upperFirst } from 'lodash/fp';
import React, { Component, createRef } from 'react';

import MeasureLog from './measurelog';
import Editor from '../../editor';

function setupEditor(editor, props, oldProps = {}) {
	const { struct, tool, toolOpts, options } = props;

	if (struct !== oldProps.struct)
		editor.struct(struct);

	if (tool !== oldProps.tool || toolOpts !== oldProps.toolOpts)
		editor.tool(tool, toolOpts);

	if (oldProps.options && options !== oldProps.options)
		editor.options(options);

	// update handlers
	Object.keys(editor.event).forEach((name) => {
		const eventName = `on${upperFirst(name)}`;

		if (props[eventName] !== oldProps[eventName]) {
			if (oldProps[eventName])
				editor.event[name].remove(oldProps[eventName]);

			if (props[eventName])
				editor.event[name].add(props[eventName]);
		}
	});
}

function removeEditorHandlers(editor, props) {
	Object.keys(editor.event).forEach((name) => {
		const eventName = `on${upperFirst(name)}`;

		if (props[eventName])
			editor.event[name].remove(props[eventName]);
	});
}

class StructEditor extends Component {
	baseRef = createRef();

	shouldComponentUpdate() {
		return false;
	}

	// TODO Remove this unsafe method it's deprecated
	// eslint-disable-next-line camelcase
	UNSAFE_componentWillReceiveProps(props) {
		setupEditor(this.instance, props, this.props);
	}

	componentDidMount() {
		console.assert(this.baseRef.current, 'No backing element');
		this.instance = new Editor(this.baseRef.current, { ...this.props.options });
		setupEditor(this.instance, this.props);
		if (this.props.onInit)
			this.props.onInit(this.instance);
	}

	componentWillUnmount() {
		removeEditorHandlers(this.instance, this.props);
	}

	render() {
		const { Tag = 'div', struct, tool, toolOpts, options, ...props } = this.props;
		// To prevent react from complaining that all these props doesn't exist on a div
		const {
			onInit,
			onSelectionChange,
			onElementEdit,
			onQuickEdit,
			onBondEdit,
			onRgroupEdit,
			onSgroupEdit,
			onSdataEdit,
			onMessage,
			onAromatizeStruct,
			onDearomatizeStruct,
			...rest
		} = props;

		return (
			<Tag ref={this.baseRef} onMouseDown={ev => ev.preventDefault()} {...rest}>
				{/* svg here */}
				<MeasureLog />
			</Tag>
		);
	}
}

export default StructEditor;
