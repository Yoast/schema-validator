import MessageSender = chrome.runtime.MessageSender;
import { Message, ValidationSummary } from "./values";
import { StructuredDataFailure, LinkedData } from "../common/values";

let validationResults: StructuredDataFailure[];
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

function generateSummary( failures: StructuredDataFailure[] ) {
	const summary: ValidationSummary = {
		error: 0,
		warning: 0,
		info: 0,
	};

	failures.forEach(
		( failure: StructuredDataFailure ) => {
			summary[ failure.severity ] += 1;
		},
	);

	return summary;
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
			console.log( schema );
			/*
			 * Validate schema here using schema validator.
			 */
			validationResults = mockResults;
			updateIcon( sender.tab.id, generateSummary( validationResults ) );
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
