(function () {
	var m = angular.module('protractorDemo', []);

	m.controller('clickDemoCtrl', [
		function () {
			// Get a dependable reference to 'this'
			var click = this;

			click.btnText = "Click to reverse";

			click.btnClick = function () {
				for (var x = click.btnText.length - 1, s = ""; x >= 0; x--) {
					s += click.btnText[x];
				}
				click.btnText = s;
			}
		}
	]);
})();
