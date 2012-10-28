#! /usr/bin/python
# -*- coding: utf-8 -*-

import urllib, json
from flask import Flask, render_template

class Fetcher(urllib.URLopener):
	version = 'kort.thunn.us (contact <3xm@detfalskested.dk> for questions)'

app = Flask(__name__)

@app.route('/')
@app.route('/<address>')
def index(address=None):
	if address:	
		fetcher = Fetcher()
		url = 'http://nominatim.openstreetmap.org/search/%s?format=json' % urllib.quote(address.encode('utf-8'))
		osmn = json.loads(fetcher.open(url).read())
		if len(osmn):
			pos = osmn[0]
			lon = pos['lon']
			lat = pos['lat']
		else:
			lon, lat = None, None
			address = 'Kan ikke finde %s' % address
	else:
		address = 'kort.thunn.us'
		lon, lat = None, None
	return render_template('index.html', address=address, lon=lon, lat=lat)

if __name__ == '__main__':
	app.run(host='0.0.0.0', debug=True)
