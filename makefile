release: _site
	rm -rf index.html
	rm -rf css
	rm -rf image
	rm -rf js
	rm -rf 2011
	rm -rf 2014
	rm -rf 2015
	rm -rf 2016
_site:
	jekyll build
