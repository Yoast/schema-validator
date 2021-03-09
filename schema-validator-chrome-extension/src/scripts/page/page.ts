import LinkedData from "./values/LinkedData";

/**
 * Gathers the Schema from the page and puts them together in a graph.
 *
 * @returns the graph.
 */
function gatherSchemaFromPage(): LinkedData {
	const schemaElements = document.querySelectorAll( "script[type='application/ld+json']" );

	const schemas: LinkedData[] = [];

	for ( let i = 0; i < schemaElements.length; i++ ) {
		schemas.push( JSON.parse( schemaElements[ i ].innerHTML ) );
	}

	return {
		"@graph": schemas,
	};
}

/**
 * Initializes the page-side of the browser extension.
 */
function initialize() {
	const graph = gatherSchemaFromPage();
}

initialize();
