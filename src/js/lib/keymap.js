var key = require('keymaster');

module.exports = function () {

	key('a', function(){ alert('you pressed a!') });
	key('b', function(){ alert('you pressed b!') });
	key('command+r', function(){ alert('you pressed refresh!') });
}

/**
* Proposed KeyMap:

{
	'command + o' 			: 'open file',
	'command + shift + o' 	: 'open directory',
	'command + l' 			: 'select current line',
	'command + d' 			: 'duplicate line',
	'command + f' 			: 'find in file',
	'command + shift + f' 	: 'find in directory',
	'command + p' 			: 'open control pane',
	'command + r'			: 'jump to method',
	'command + t' 			: 'open toggle files', //could be different idk
	'command + shift + t'	: 'reopen last closed file',
	'command + n'			: 'new file'

	//CHECK:: these might already be included in codemirror
	'command + c' 			: 'copy selection',
	'command + v'			: 'paste',
	'command + a' 			: 'select all'
}

*/
