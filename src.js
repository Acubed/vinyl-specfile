
var path = require('path');
var url = require('url');
var fs = require('fs');

var through = require('through2');
var vinyl = require('vinyl-fs');
var specfile = require('../guru-specfile');

module.exports.src = specfileSrc;

function specfileSrc(className, specfilename) {
	specfilename = specfilename || 'Specfile';
	var contents = fs.readFileSync(specfilename, 'utf8');
	var parsed = specfile.parseDocument(contents);	
	var fileStream = through.obj();

	var remaining = 1;
	parsed.resources.forEach(function(n){
		remaining++;
		//var files = n.split(',').map(function(v){return v.trim()}).forEach(function(pattern){});
		var pattern = n.pattern;
		if(!pattern){
			if(n.subject && n.subject[0]==='`' && n.subject[n.subject.length-1]==='`'){
				pattern = n.subject.substring(1,n.subject.length-1);
			}
		}

		if(!pattern) return;
		
		var files = vinyl.src(pattern);
		files.on('data', function(e){ fileStream.write(e); });
		files.on('end', endStream);
	});

	function endStream(){
		if(--remaining!==0) return;
		fileStream.end();
	}
	endStream();

	return fileStream;
}
