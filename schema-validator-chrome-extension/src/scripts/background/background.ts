import MessageSender = chrome.runtime.MessageSender;
import { SchemaValidationResult, SchemaValidator } from "schema-validator/dist/scripts";

import { Message, ValidationSummary } from "./values";
import { LinkedData } from "../common/values";

let validationResults: SchemaValidationResult;
let schema: LinkedData;

function setIcon( tabId: number, icon: "green" | "grey" | "orange" | "red" ) {
	chrome.browserAction.setIcon( {
		path: `../images/${ icon }.png`,
		tabId,
	} );
}

function setBadge( tabId: number, text: string, color: "green" | "grey" | "orange" | "red" ) {
	chrome.browserAction.setBadgeText( { text, tabId } );
	chrome.browserAction.setBadgeBackgroundColor( { color, tabId } );
}

function updateIcon( tabId: number, summary: ValidationSummary ) {
	if ( summary.error > 0 ) {
		setIcon( tabId, "red" );
		setBadge( tabId, summary.error.toString(), "red" );
		return;
	}
	if ( summary.warning > 0 ) {
		setIcon( tabId, "orange" );
		setBadge( tabId, summary.warning.toString(), "orange" );
		return;
	}
	setIcon( tabId, "green" );
	setBadge( tabId, "", "grey" );
}

/**
 * Handles the message.
 *
 * @param command
 * @param payload
 * @param sender
 * @param sendResponse
 */
function handleMessage( { command, payload }: Message, sender: MessageSender, sendResponse: ( response?: unknown ) => void ) {
	switch ( command ) {
		case "generateValidationReport": {
			schema = payload as LinkedData;

			const validator = new SchemaValidator();

			validator.validate( JSON.stringify( schema ), sender.url )
				.then(
					results => {
						validationResults = results;
						console.log( validationResults );
						updateIcon( sender.tab.id, results.failureCounts );
					},
				);

			break;
		}
		case "getValidationResults": {
			sendResponse( validationResults );
			break;
		}
		default: {
			break;
		}
	}
}

chrome.runtime.onMessage.addListener( handleMessage );
