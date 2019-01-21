import { task, src, dest } from 'gulp';
import merge from 'gulp-merge-json';
import { basename } from 'path';

task('build-locales', () => {
	src('lang/*.json')
		.pipe(merge({
			fileName: 'locales.json',
			edit: (parsedJson, file) => {
				const lang = basename(file.path, '.json');
				return {
					[lang]: parsedJson
				};
			}
		}))
		.pipe(dest('.'));
});
