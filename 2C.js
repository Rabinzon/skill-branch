const http = require('http');

const reg2 = /^\/\?username=(\@)?(\w+)/;
const reg1 = /^\/\?username=(((http[s]?|ftp):)?\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/;

const test = (str, reg) => reg.test(str);

const getUserName = url => {
	if (test(url, reg1)) {
		return `@${url.match(reg1)[7]}`;
	} else if (test(url, reg2)) {
		return `@${url.match(reg2)[2]}`;
	}
	return `invalid username`;
};

http.createServer((req, res) => {
	res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.end(getUserName(req.url));
}).listen(3080);