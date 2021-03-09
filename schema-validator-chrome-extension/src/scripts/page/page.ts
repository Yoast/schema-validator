import LinkedData from "./values/LinkedData";
import { StructuredDataFailure } from "../common/values";

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

const mockResults: StructuredDataFailure[] = [
	{
		property: "author",
		message: "A message",
		severity: "warning",
		shape: "",
	},
	{
		property: "name",
		message: "A second message",
		severity: "error",
		shape: "",
	},
];

function sendResults( failures: StructuredDataFailure[] ) {
	chrome.runtime.sendMessage( { command: "setValidationResults", payload: failures } );
}

/**
 * Initializes the page-side of the browser extension.
 */
function initialize() {
	const graph = gatherSchemaFromPage();
	console.log( graph );
	sendResults( mockResults );
}

initialize();
