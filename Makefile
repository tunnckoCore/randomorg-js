
install:
	@npm install

test: install
	node_modules/mocha/bin/mocha \
		--reporter spec \
		--require should \
		test.node.js

start: install test
	node example.js

.PHONY: install test start