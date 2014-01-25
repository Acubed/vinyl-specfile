# vinyl-specfile

Select files on a filesystem by their type, as defined in the project's Specfile.

## Usage

Make sure there's patterns defined in your `Specfile`:

	`test/**/*.js` a TestFile .

Then match these files in your gulpfile:

	var specfile = require('vinyl-specfile');
	specfile.src('TestFile')
		.pipe(/* ... */);
