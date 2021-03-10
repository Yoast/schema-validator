import { StructuredDataFailure } from "../common/values";
import { SchemaValidationResult } from "schema-validator";
import FailureListPresenter from "./presenters/FailureListPresenter";

let report: SchemaValidationResult;

/**
 * Gets the validation result from the background script.
 *
 * @returns A promise with the validation result.
 */
async function getResult(): Promise<SchemaValidationResult> {
	return new Promise(
		( resolve ) => {
			chrome.runtime.sendMessage( { command: "getValidationResults" }, response => {
				resolve( response );
			} );
		},
	);
}

/**
 * Sorts the given failures based on their severity, errors at the top.
 *
 * @param failures The validation failures to sort.
 */
function sortFailures( failures: StructuredDataFailure[] ): void {
	failures.sort( ( failure1: StructuredDataFailure ) => failure1.severity === "error" ? -1 : 1 );
}

/**
 * Initializes the popup by getting the validation result
 * and updating the contents of the popup accordingly.
 */
async function initialize(): Promise<void> {
	if ( ! report ) {
		report = await getResult();
	}

	const failures = report.failures;
	sortFailures( failures );
	const resultList = new FailureListPresenter( document.body );
	resultList.render( report );
}

initialize();
