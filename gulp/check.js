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
const gulp = require('gulp');
const gutil = require('gulp-util');
const eslint = require('gulp-eslint');
const cp = require('child_process');

const authorizations = {
	'https://github.com/epam/ketcher.git': {
		check: d => ((d = cp.execSync('git config user.email').toString().trim(), [/@epam.com$/.test(d), d])), // eslint-disable-line no-return-assign
		message: data => ('Email ' + data + ' is not from EPAM domain.')
	}
};

module.exports.checkCommitAuthorization = function (options, cb) {
	try {
		const origin = cp.execSync('git config remote.origin.url').toString().trim();

		const [isValid, data] = (!authorizations[origin] && [true, null])
								|| authorizations[origin].check();

		if (isValid) {
			cb();
		} else {
			cb(new gutil.PluginError('check-commit-authorization', authorizations[origin].message(data)));
			gutil.log('To check git project\'s settings run `git config --list`');
			gutil.log('Could not continue. Bye!');
		}
	} catch (e) {
		gutil.log(e);
	}
};

module.exports.checkDepsExact = function (options, cb) {
	const semver = require('semver'); // TODO: output corrupted packages
	const allValid = ['dependencies', 'devDependencies'].every((d) => {
		const dep = options.pkg[d];
		return Object.keys(dep).every((name) => {
			const ver = dep[name];
			return (semver.valid(ver) && semver.clean(ver));
		});
	});
	if (!allValid) {
		cb(new gutil.PluginError('check-deps-exact',
			'All top level dependencies should be installed' +
			'using `npm install --save-exact` command'));
	} else {
		cb();
	}
};

module.exports.lint = function (options) {
	return gulp.src(options.src)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
};
