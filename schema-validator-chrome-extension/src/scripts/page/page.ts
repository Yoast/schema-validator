import { LinkedData } from "../common/values";

/**
 * Gathers the Schema from the page and puts them together in a graph.
 *
 * @returns the graph.
 */
function gatherSchemaFromPage(): LinkedData {
	const schemaElements = document.querySelectorAll( "script.yoast-schema-graph[type='application/ld+json']" );

	const schemas: LinkedData[] = [];

	for ( let i = 0; i < schemaElements.length; i++ ) {
		schemas.push( JSON.parse( schemaElements[ i ].innerHTML ) );
	}

	return {
		"@graph": schemas,
	};
}

/**
 * Sends a message to the background script to generate the validation report.
 *
 * @param schema The schema to generate the report for.
 */
function generateValidationReport( schema: LinkedData ) {
	chrome.runtime.sendMessage( { command: "generateValidationReport", payload: schema } );
}

/**
 * Initializes the page-side of the browser extension.
 */
function initialize() {
	const graph = gatherSchemaFromPage();
	console.log( graph );
	generateValidationReport( graph );
}

initialize();
