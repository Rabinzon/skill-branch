const http = require('http');

const get = query => {
	const name = query.split('/?fullname=')[1];
	if (typeof name === 'string') return name.split(' ');
	return [];
};
const sur = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

const shortName = query => {
	const name = get(query).filter(t => t !== '');
	const valid = name.every(t => !/[0-9]/g.test(t) && !/[\_\-\/]/g.test(t));
	let result = '';
	if (name.length < 4 && name.length > 0 && valid) {
		result = name.reduce((acc, cur, i) => {
			if (i + 1 !== name.length) {
				return acc += ' ' + cur.match(/^./)[0].toUpperCase() + '.';
			}
			return acc;
		}, sur(name[name.length - 1]));
	}
	return result !== '' ? result : `Invalid fullname`;
};

http.createServer((req, res) => {
	res.setHeader('Content-Type', 'text/plain; charset=utf-8');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.end(shortName(decodeURI(req.url)));
}).listen(3080);