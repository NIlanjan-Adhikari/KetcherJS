import React from 'react';

// TODO Make a better type
// TODO Uncomment when it's converted to typescript
type ApiMethod = (data: any, options: any) => any;

// TODO Uncomment when it's converted to typescript
export interface SketcherApi {
    indigoVersion: string,
    imagoVersions: string,
    readey: Boolean,
    convert: ApiMethod,
    layout: ApiMethod,
    clean: ApiMethod,
    aromatize: ApiMethod,
    dearomatize: ApiMethod,
    calculateCip: ApiMethod,
    automap: ApiMethod,
    check: ApiMethod,
    calculate: ApiMethod,
    recognize: ApiMethod,
}

const notImplementedOp = () => Promise.reject(new Error('You reached a fake api implementation'));

export const NOOP_API = {
	indigoVersion: null,
	imagoVersions: null,
	ready: false,
	convert: notImplementedOp,
	layout: notImplementedOp,
	clean: notImplementedOp,
	aromatize: notImplementedOp,
	dearomatize: notImplementedOp,
	calculateCip: notImplementedOp,
	automap: notImplementedOp,
	check: notImplementedOp,
	calculate: notImplementedOp,
	recognize: notImplementedOp
};

const context = React.createContext(NOOP_API);

export default context;
