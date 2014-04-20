describe('drag and drop', function () {
	var leftList = 'section:nth-of-type(2) ul:nth-of-type(1)',
		rightList = 'section:nth-of-type(2) ul:nth-of-type(2)';

	it('Loads the page', function () {
		// load the page
		browser.get('index.html');
	});

	it('Drag from left to right', function () {
		// Get second item from left list
		var item = element(by.css(leftList + ' li:nth-child(2)'));

		// Drag it to the right list
		browser.actions().dragAndDrop(item, element(by.css(rightList))).perform();

		// Test that it's found in the right list now
		expect($$(leftList + ' li').count()).toBe(2);
		expect($$(rightList + ' li').count()).toBe(4);
	});

	it('Drag from right to left', function () {
		// Get first item from right list
		var item = $(rightList + ' li:nth-child(1)');

		// Drag it to the left list
		browser.actions().dragAndDrop(item, $(leftList)).perform();

		// Test that it's found in the right list now
		expect($$(leftList + ' li').count()).toBe(3);
		expect($$(rightList + ' li').count()).toBe(3);
	});
});