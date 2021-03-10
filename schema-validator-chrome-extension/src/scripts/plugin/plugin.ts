import { SchemaValidationResult } from "schema-validator";
import SchemaValidationResultPresenter from "./presenters/SchemaValidationResultPresenter";

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
 * Initializes the popup by getting the validation result
 * and updating the contents of the popup accordingly.
 */
async function initialize(): Promise<void> {
	if ( ! report ) {
		report = await getResult();
	}

	if ( report ) {
		document.body.innerHTML = new SchemaValidationResultPresenter().render( report );
	}
}

initialize();
