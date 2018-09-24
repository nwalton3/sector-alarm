
var goals = (function(){

	var doc = document;


	// Init
	function init() {
	    // do something

	    var goals = doc.getElementsByClassName( "goal" );
	    var goalsObj = localStorage.getItem('goals');
	    var goalsJSON = goalsObj ? JSON.parse( goalsObj ) : false;

	    Array.prototype.forEach.call( goals, function( goal ) {
	    	var title = goal.getElementsByTagName( 'h2' )[0];
			var info = goal.getElementsByClassName( 'goal-info' )[0];
			var name = title.innerHTML.toLowerCase() + "";
			var target = goalsJSON ? goalsJSON[ name ] : 0;

			addEditor( goal, name, target );

		});

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





	function addEditor( el, name, val ) {
		var editor = `            <fieldset>
              <label for="edit-goal-${name}">Kuukauden tavoite</label>
              <input type="number" id="edit-goal-${name}" name="edit-goal-${name}" value=${val} />
            </fieldset>
            <input class="submit" type="submit" value="Save" >`;
        var form = document.createElement('form');
        form.className = "edit";
        form.innerHTML = editor;

        el.append( form );

        var input = document.getElementById("edit-goal-" + name);
        var goal = el;

        input.addEventListener( "input", function(e){
			var target = input.value;
        	updateTarget( goal, target );
        });

        form.getElementsByClassName( "submit" )[0].addEventListener("click", function(e){
        	e.preventDefault();
        	closeEditor( goal );
        });

	}


	function updateTarget( el, newTarget ) {
		var target = el.getElementsByClassName('target')[0];
		var dailyTarget = el.getElementsByTagName( 'mark' )[0];
		var progress = el.getElementsByTagName( 'progress' )[0];

		target.innerHTML = newTarget;
		dailyTarget.innerHTML = Math.ceil( Number(newTarget) / 20 );
		progress.max = newTarget;
	}


	function closeEditor( el ) {
		el.className = "goal";
	}


	function openEditor( el ) {
		el.className = "goal editor-open";
	}


	// var goals = { 'doors': 500, 'bookings': 100, 'meetings': 50, 'sales': 40 };

	// // Put the object into storage
	// localStorage.setItem('goals', JSON.stringify(goals));





})();