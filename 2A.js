const http = require('http');

const getSum = query =>
	query.split('&')
		.map(t => t.split('=')[1])
		.reduce((acc, cur) => acc + Number(cur), 0);
const validate = query => {
	if (query === '/?') return 0;
	return getSum(query);
};

http.createServer((req, res) => {
	res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.end(String(validate(req.url)));
}).listen(3080);