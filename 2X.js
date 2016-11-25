const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const map = new Map([
	[0, 1],
	[1, 18],
	[2, 243],
	[3, 3240],
	[4, 43254],
	[5, 577368],
	[6, 7706988],
	[7, 102876480],
	[8, 1373243544],
	[9, 18330699168],
	[10, 244686773808],
	[11, 3266193870720],
	[12, 43598688377184],
	[13, 581975750199168],
	[14, 7768485393179328],
	[15, 103697388221736960],
	[16, 1384201395738071424],
	[17, 18476969736848122368],
	[18, 246639261965462754048],
]);

const query = (req) => req.url.split(/\/\?i=/).join('');
const get = (query) => map.get(Number(query)).toString();

app.get('/*', (req, res) => {
	res.send(get(query(req)));
});

app.listen(3001, () => console.log(`open localhost:3001`));