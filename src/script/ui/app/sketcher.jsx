import 'babel-polyfill';
import 'whatwg-fetch';
import { Provider } from 'react-redux';

import React, { useEffect, useRef, useState } from 'react';
import { AppCliparea, AppHidden } from './hidden';
import AppEditor from './editor';
import AppModal from './modal';
import Toolbar from './toolbar';
import createStore, { onAction } from '../state';
import { appUpdate } from '../state/options';
import { initKeydownListener } from '../state/hotkeys';
import { initResize } from '../state/toolbar';
import HelperApiContext, { NOOP_API, SketcherApi } from '../context/HelperApiContext';


const buildInfo = {
	version: '__VERSION__',
	apiPath: '__API_PATH__',
	buildDate: '__BUILD_DATE__',
	buildNumber: '__BUILD_NUMBER__' || null
};

type SketcherProps = {
	options?: { [key: any]: any },
	helperApi?: SketcherApi
};

const store = createStore({ ...buildInfo });

const Sketcher: React.FC<SketcherProps> = ({ options, helperApi = NOOP_API }) => {
	const baseRef = useRef(undefined);
	const [editorInitialized, setEditorInitialized] = useState(false);

	useEffect(() => {
		if (!editorInitialized) return;
		let update = options ? { ...options } : {};
		// TODO Find a way to remove this dependency to "indigo"
		if (helperApi) {
			update = {
				...update,
				indigoVersion: helperApi.indigoVersion,
				imagoVersions: helperApi.imagoVersions,
				helperApi
			};
		}

		store.dispatch(appUpdate(update));
	}, [options, helperApi, editorInitialized]);

	useEffect(() => {
		if (baseRef) {
			store.dispatch(initKeydownListener(baseRef.current));
			store.dispatch(initResize());
			setEditorInitialized(true);
		}
	}, [baseRef]);

	return (
		<main ref={baseRef} className="application">
			{editorInitialized && (
				<HelperApiContext.Provider value={helperApi}>
					<Provider store={store}>
						<AppHidden />
						<AppEditor id="canvas" />
						<Toolbar onAction={action => store.dispatch(onAction(action))} />
						<AppCliparea />
						<AppModal />
					</Provider>
				</HelperApiContext.Provider>
			)}
		</main>
	);
};

export default Sketcher;
