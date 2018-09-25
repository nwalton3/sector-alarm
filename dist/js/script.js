
var goals = (function(){

	var doc = document;

	// Init
	function init() {
	    // do something

	    updateGoals();

	    var goalsObj = localStorage.getItem('goals');


	    var editButton = document.getElementById('edit-goals');
	    var saveButton = document.getElementById('set-goals');
	    var skipButton = document.getElementById('skip-goals');

		editButton.addEventListener("click", function(e) {
			showEditor();
		});

		saveButton.addEventListener("click", function(e) {
			e.preventDefault();
			saveGoals();
			hideEditor();
		});

		skipButton.addEventListener("click", function(e){
			e.preventDefault();
			hideEditor();
		});

		if( !goalsObj ) {
			showEditor();
		}
	}

	// in case the document is already rendered
	if (document.readyState!='loading') init();
	// modern browsers
	else if (document.addEventListener) document.addEventListener('DOMContentLoaded', init);
	// IE <= 8
	else document.attachEvent('onreadystatechange', function(){
	    if (document.readyState=='complete') init();
	});





	function showEditor() {
		document.body.className = "show-set-goals";
	}

	function hideEditor() {
		document.body.className = "";
	}

	function saveGoals() {
		var bookings = document.getElementById("bookings-goal").value;
		var sales = document.getElementById("sales-goal").value;
		var doors = bookings * 5;
		var meetings = parseInt(sales) + 1;

		var data = { 'doors': doors, 'bookings': bookings, 'meetings': meetings, 'sales': sales };

		localStorage.setItem('goals', JSON.stringify(data));

		updateGoals();
	}

	function resetGoals() {
		localStorage.removeItem('goals');
	}


	function updateGoals() {
		var defaults = { 'doors': 25, 'bookings': 5, 'meetings': 3, 'sales': 2 };
	    var goals = doc.getElementsByClassName( "goal" );
	    var goalsObj = localStorage.getItem('goals');
	    var goalsJSON = goalsObj ? JSON.parse( goalsObj ) : false;

	    var goalsData = goalsJSON || defaults;

	    Array.prototype.forEach.call( goals, function( goal ) {
			var info = goal.getElementsByClassName( 'goal-info' )[0];
			var name = goal.id.replace("goal-", "");
			var target = goalsData ? goalsData[ name ] : 0;

			updateTarget( goal, target );

		});
	}

	function updateTarget( el, newTarget ) {
		// var target = el.getElementsByClassName('target')[0];
		var dailyTarget = el.getElementsByTagName( 'mark' )[0];
		// var progress = el.getElementsByTagName( 'progress' )[0];

		// target.innerHTML = newTarget;
		dailyTarget.innerHTML = newTarget;
		// progress.max = newTarget;
	}




	// var goals = { 'doors': 500, 'bookings': 100, 'meetings': 50, 'sales': 40 };

	// // Put the object into storage
	// localStorage.setItem('goals', JSON.stringify(goals));





})();