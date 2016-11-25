const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const urlReg = /\/\?color=./;
const noReg = /\/\?color=%23rgb/;
const rgbaReg = /\/\?color=rgb/;
const queryReg = /\/\?color=/;
const colorReg = /^[0-9a-f]{3}([0-9a-f]{3})?$/;

const rgb2hex = (rgb) => {
	rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	return (rgb && rgb.length === 4 && rgb.slice(1).every(t => Number(t) < 256 && Number(t) >= 0))? "#" +
	("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
	("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
	("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
};

const testUrl = (url) =>
	!(url.match(/%23/g) && url.match(/%23/g).length > 1);

const getQuery = (url) =>
	url.split(queryReg)
		.join('')
		.split(/%[0-3]{2}/g)
		.join('')
		.toLocaleLowerCase();

const toLong = (query) =>
	[...query].reduce((acc, t) => acc+= t + t, '');

const getColor = (query) => {
	if (!colorReg.test(query)) return false;
	
	return query.length === 3
		? `#${toLong(query)}`
		: `#${query}`;
};

const testRgb = (url) =>
	rgbaReg.test(url) &&
	[...url.split(queryReg)
		.join('')
		.match(/%20/g)].length === 3;

app.get('/*', (req, res) => {
	const query = urlReg.test(req.url) && testUrl(req.url) && !noReg.test(req.url) ? getQuery(req.url) : false;
	const color = /^rgb/.test(query) ? rgb2hex(query) : getColor(query);
	if (color) return res.send(color);
	else res.send('Invalid color');
	
});

app.listen(3002, () => console.log(`open localhost:3002`));