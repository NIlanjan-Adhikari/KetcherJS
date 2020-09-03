import 'babel-polyfill';
import 'whatwg-fetch';

import React, { useState, useEffect } from 'react';
import queryString from 'query-string';

import api from '../../api';
import Sketcher from './sketcher';
import { NOOP_API } from '../context/HelperApiContext';


const loadApiProxy = (
	apiPath: String,
): Promise<void> => api(apiPath, {
	'smart-layout': true,
	'ignore-stereochemistry-errors': true,
	'mass-skip-error-on-pseudoatoms': false,
	'gross-formula-add-rsites': true
});

const params = queryString.parse(document.location.search);

const Ketcher = () => {
	const [helperApi, setHelperApi] = useState(NOOP_API);

	useEffect(() => {
		async function waitProxy() {
			const apiProxy = await loadApiProxy(params.api_path);
			setHelperApi(apiProxy);
		}

		waitProxy();
	}, []);

	return (
		<Sketcher helperApi={helperApi} options={params} />
	);
};

export default Ketcher;
