
var goals = (function(){

	var doc = document;
	var defaults = { 'doors': 500, 'bookings': 100, 'meetings': 50, 'sales': 40 };

	// Init
	function init() {
	    // do something

	    resetGoals();

	    var goals = doc.getElementsByClassName( "goal" );
	    var goalsObj = localStorage.getItem('goals');
	    var goalsJSON = goalsObj ? JSON.parse( goalsObj ) : false;

	    var goalsData = goalsJSON || defaults;

	    var saveButton = document.getElementById('set-goals');
	    var skipButton = document.getElementById('skip-goals');

	    Array.prototype.forEach.call( goals, function( goal ) {
			var info = goal.getElementsByClassName( 'goal-info' )[0];
			var name = goal.id.replace("goal-", "");
			var target = goalsData ? goalsData[ name ] : 0;

			updateTarget( goal, target );

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

		if( !goalsJSON ) {
			showEditor();
		}

	    // console.log( goals )

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

	}

	function resetGoals() {
		localStorage.removeItem('goals');
	}

	function updateTarget( el, newTarget ) {
		var target = el.getElementsByClassName('target')[0];
		var dailyTarget = el.getElementsByTagName( 'mark' )[0];
		var progress = el.getElementsByTagName( 'progress' )[0];

		target.innerHTML = newTarget;
		dailyTarget.innerHTML = Math.ceil( Number(newTarget) / 20 );
		progress.max = newTarget;
	}




	// var goals = { 'doors': 500, 'bookings': 100, 'meetings': 50, 'sales': 40 };

	// // Put the object into storage
	// localStorage.setItem('goals', JSON.stringify(goals));





})();