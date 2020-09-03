import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import queryString from 'query-string';

import api from '../../api';
import Sketcher from './sketcher';


const loadApiProxy = (
	apiPath: String,
): Promise<void> => api(apiPath, {
	'smart-layout': true,
	'ignore-stereochemistry-errors': true,
	'mass-skip-error-on-pseudoatoms': false,
	'gross-formula-add-rsites': true
});

const apiProxy = loadApiProxy();
const params = queryString.parse(document.location.search);

const Ketcher: React.FC = () => <Sketcher helperApi={apiProxy} options={params} />;

export default Ketcher;
