# vinyl-specfile

Select files on a filesystem by their type, as defined in the project's Specfile.

## Usage

	var specfile = require('vinyl-specfile');
	specfile.src('TestFile')
		.pipe(/* ... */);
