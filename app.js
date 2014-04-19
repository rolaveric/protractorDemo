(function () {
	var m = angular.module('protractorDemo', ['ui.event']);

	m.run(['$window', function ($window) {
		if ($window.jQuery) {
			// add the dataTransfer property for use with the native `drop` event
			// to capture information about files dropped into the browser window
			$window.jQuery.event.props.push("dataTransfer");
		}
	}]);

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

	m.controller('dragDropDemoCtrl', [
		function () {
			// Get a dependable reference to 'this'
			var dnd = this;

			// The different events and handlers for a drop container
			dnd.listEvents = {
				'dragenter': 'dnd.dragEnter($event, list)',
				'dragover': 'dnd.dragOver($event, list)',
				'dragleave': 'dnd.dragLeave($event, list)',
				'drop': 'dnd.drop($event, list)'
			};

			dnd.itemEvents = {
				'dragstart': 'dnd.dragStart($event, item, list)',
				'dragend': 'dnd.dragEnd($event, $index, list)'
			};

			dnd.lists = [
				{id: "0", items: ['left1', 'left2', 'left3']},
				{id: "1", items: ['right1', 'right2', 'right3']}
			];

			function checkEvent(event, targetList) {
				var dt = event.dataTransfer;
				return dt.types.indexOf('text/plain') != -1 && dt.types.indexOf('application/x-origin') != -1 &&
					// Will allow us to do what we want
					dt.effectAllowed == 'move' &&
					// And did not originate from this list
					dt.getData('application/x-origin') !== targetList.id;
			}

			dnd.dragStart = function ($event, item, list) {
				// Stop the event from bubbling up any further in the DOM
				$event.stopPropagation();

				var dt = $event.dataTransfer;

				// Indicate what's being moved
				dt.setData('text/plain', item);

				// Indicate where it came from
				dt.setData('application/x-origin', list.id);

				// Indicate what the drop target is allowed to do with this data
				dt.effectAllowed = 'move';
			};

			dnd.dragEnd = function ($event, index, originalList) {
				$event.stopPropagation();
				// If the drop caused a move, remove it from the original list
				if ($event.dataTransfer.dropEffect != 'none') {
					originalList.items.splice(index, 1);
				}
			};

			dnd.dragEnter = function ($event, targetList) {
				$event.stopPropagation();

				// Check if what's being dragged has something we want
				if (checkEvent($event, targetList)) {

					// Default is to reject draggables
					$event.preventDefault();

					// Add styling
					targetList.highlight = true;
				}
			};

			dnd.dragOver = function ($event, targetList) {
				// Not using mouse location, so same as dragenter
				dnd.dragEnter($event, targetList);
			};

			dnd.dragLeave = function ($event, targetList) {
				$event.stopPropagation();

				// Remove styling
				targetList.highlight = false;
			};

			dnd.drop = function ($event, targetList) {
				$event.stopPropagation();
				var dt = $event.dataTransfer;

				// Remove styling
				targetList.highlight = false;

				// Check data transfer is acceptable
				if (checkEvent($event, targetList)) {
					$event.preventDefault();

					// Transfer Data
					targetList.items.push(dt.getData('text/plain'));

					// Indicate the effect of the drop
					dt.dropEffect = 'move';
				}
			};

			dnd.listClass = function (list) {
				return "list pull-left" + (list.highlight ? " highlight" : "");
			};
		}
	]);

})();

