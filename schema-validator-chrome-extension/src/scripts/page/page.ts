/**
 * Initializes the page-side of the browser extension.
 */
function initialize() {
	const schemaElements = document.querySelectorAll( "script[type='application/ld+json']" );

	const schemas = [];

	for ( let i = 0; i < schemaElements.length; i++ ) {
		schemas.push( JSON.parse( schemaElements[ i ].innerHTML ) );
	}

	console.log( schemas );
}

initialize();
