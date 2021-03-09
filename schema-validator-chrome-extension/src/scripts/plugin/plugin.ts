import { StructuredDataFailure } from "../common/values";
import result from "./presenters/result";


async function getResults(): Promise<StructuredDataFailure[]> {
	return new Promise(
		( resolve ) => {
			chrome.runtime.sendMessage( { command: "getValidationResults" }, ( failures ) => {
				resolve( failures );
			} );
		},
	);
}

function sortFailures( failures: StructuredDataFailure[] ) {
	failures.sort( ( failure1, failure2 ) => {
		if ( failure1.severity === "error" ) {
			return -1;
		}
		if ( failure2.severity === "warning" ) {
			return 1;
		}
		return 0;
	} );
}

async function initialize() {
	const failures = await getResults();
	sortFailures( failures );
	document.body.innerHTML = failures.map( failure => result( failure ) ).join( "" );
}

initialize();
