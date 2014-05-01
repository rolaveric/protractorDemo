protractorDemo
==============

Demo AngularJS application for writing E2E tests for using Protractor

# Setup

Clone the repository

`git clone https://github.com/rolaveric/protractorDemo`

Install bower and protractor node modules locally

`npm install`

Install bower components

`node_modules/bower/bin/bower install`

Install selenium server

`node_modules/protractor/bin/webdriver-manager update`

Start selenium server

`node_modules/protractor/bin/webdriver-manager start`

Start web server

`node config/web-server.js`

Run protractor

`node_modules/protractor/bin/protractor config/protractor.conf.js`
