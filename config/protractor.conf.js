exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['../test/e2e/*.js'],
	baseUrl: 'http://localhost:63342/protractorDemo/',
	multiCapabilities: [
		{'browserName': 'chrome'},
		{'browserName': 'firefox'}
	]
};
