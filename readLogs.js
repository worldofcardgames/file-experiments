"use strict";
var fs = require('fs');

//var str = fs.readFileSync('hearts.log.2016-05-01T', 'utf8');
var str = fs.readFileSync('hearts.log.2016-05-02T', 'utf8');
var lines = str.split("\n");
console.log(lines.length);

var n = 0;
var v = {};
v.deck = ["1c","1d","1h","1s","2c","2d","2h","2s","3c","3d","3h","3s","4c","4d","4h","4s","5c","5d","5h","5s","6c","6d","6h","6s","7c","7d","7h","7s","8c","8d","8h","8s","9c","9d","9h","9s","10c","10d","10h","10s","11c","11d","11h","11s","12c","12d","12h","12s","13c","13d","13h","13s"];
console.log(v.deck.length);
v.hashDeck = {};
v.countDeals = 0;
v.deck.forEach(function(c, i) {
	v.hashDeck[c] = i;
});
var create2DArray = function(rows) {
	var arr = [];
	for (var i=0;i<rows;i++) {
		arr[i] = [];
		for (var j = 0; j < rows; j++) {
			arr[i].push(0);
		}
	}
	return arr;
};
v.matrix = create2DArray(52);
var counter = 0;
lines.forEach(function(line, i) {
	n++;
	counter++;
	var l = line.trim();
	if (l.length) {
		var deck = [];
		var obj = JSON.parse(l);
		for (var j = 0; j < 4; j++) {
			deck = deck.concat(obj[j].b);
		}
		if (deck.length !== 52) {
			throw new Error(counter + " " + n + " Deck length " + deck.length + " " + JSON.stringify(deck));
		}
		// recreates the deck from logged information
		deck.forEach(function(card, i) {
			var pos = +(v.hashDeck[card]);
			v.matrix[pos][i]++;
		});
		v.countDeals++;
	}
});
console.log(v.countDeals);
console.log(JSON.stringify(v.matrix));