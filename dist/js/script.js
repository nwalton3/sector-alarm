
var goals = (function(){

	var doc = document;


	// Init
	function init() {
	    // do something

	    var goals = doc.getElementsByClassName( "goal" );
	    var goalsObj = localStorage.getItem('goals');

	    if( goalsObj ) {
	    	console.log( goalsObj );
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



	// var goals = { 'doors': 500, 'bookings': 100, 'meetings': 50, 'sales': 40 };

	// // Put the object into storage
	// localStorage.setItem('goals', JSON.stringify(goals));





})();