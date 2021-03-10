import { StructuredDataFailure } from "../common/values";
import result from "./presenters/result";
import { SchemaValidationResult } from "schema-validator";


async function getResult(): Promise<SchemaValidationResult> {
	return new Promise(
		( resolve ) => {
			chrome.runtime.sendMessage( { command: "getValidationResults" }, report => {
				resolve( report );
			} );
		},
	);
}

function sortFailures( failures: StructuredDataFailure[] ) {
	failures.sort( ( failure1: StructuredDataFailure ) => failure1.severity === "error" ? -1 : 1 );
}

async function initialize() {
	const report = await getResult();
	const failures = report.failures;
	sortFailures( failures );
	document.body.innerHTML = failures.map( failure => result( failure ) ).join( "" );
}

initialize();
