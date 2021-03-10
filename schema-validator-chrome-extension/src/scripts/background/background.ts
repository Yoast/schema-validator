import MessageSender = chrome.runtime.MessageSender;
import { SchemaValidationResult, SchemaValidator } from "schema-validator/dist/scripts";

import { Message } from "./values";
import { LinkedData } from "../common/values";
import { IconPresenter } from "./presenters";

let validationResults: SchemaValidationResult;
let schema: LinkedData;

/**
 * Handles messages passed from other parts of the browser extension
 * (e.g. content scripts and the popup scripts).
 *
 * @param message The command.
 * @param sender Information about the sender of the message.
 * @param sendResponse Function to synchronously send a response back to the sender.
 *
 * @returns `true` when sending an asynchronous response back using `sendResponse`.
 */
function handleMessage( message: Message, sender: MessageSender, sendResponse: ( response?: unknown ) => void ): boolean {
	const { command, payload } = message;

	switch ( command ) {
		case "generateValidationReport": {
			schema = payload as LinkedData;

			const icon = new IconPresenter( sender.tab.id );

			const validator = new SchemaValidator();

			validator.validate( JSON.stringify( schema ), sender.url )
				.then(
					results => {
						validationResults = results;
						console.log( validationResults );
						icon.render( validationResults );
					},
				);

			break;
		}
		case "getValidationResults": {
			sendResponse( validationResults );
			// Turn this into an asynchronous response.
			return true;
		}
		default: {
			break;
		}
	}
}

chrome.runtime.onMessage.addListener( handleMessage );
