describe('click to reverse', function () {
	var btn;

	it('Reverses the button label on click', function () {
		// load the page
		browser.get('http://localhost:63342/protractorDemo/index.html');

		// Find the button
		btn = element(by.binding('click.btnText'));

		// Click it
		btn.click();

		// Test the label
		expect(btn.getText()).toEqual('esrever ot kcilC');
	});

	it('Change the label back on the next click', function () {
		// Clicks it again
		btn.click();

		// Test the label
		expect(btn.getText()).toEqual('Click to reverse');
	});
});