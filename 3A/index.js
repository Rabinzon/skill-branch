const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const fetch = require('isomorphic-fetch');
const conf = require('./conf.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let pc = {};
fetch(conf.url)
	.then((res) => res.json())
	.then(res => pc = res)
	.catch(err => console.log(err));

app.get('/*', (req, res) => {
	const query = req.url.split('/').slice(1).filter(t => t !== '');
	const r = query.reduce((a, b) => {
		if (a && a.hasOwnProperty(b) && !(b === 'length' && (a instanceof Array || typeof a === 'string'))) return a[b];
		else return undefined;
	}, pc);
	if (query[0] === 'volumes') {
		const a = pc.hdd.reduce((acc, b) => {
			if (acc.hasOwnProperty(b.volume)) {
				acc[b.volume] = acc[b.volume] + b.size;
			} else {
				acc[b.volume] = b.size;
			}
			return acc;
		}, {});
		Object.keys(a).forEach(t => a[t] = a[t] + "B");
		return res.send(JSON.stringify(a));
	}
	if (query[0] === '') return res.send(JSON.stringify(pc));
	if (r === undefined) return res.sendStatus(404);
	res.send(JSON.stringify(r));
});

app.listen(3003, () => console.log(`open localhost:3003`));