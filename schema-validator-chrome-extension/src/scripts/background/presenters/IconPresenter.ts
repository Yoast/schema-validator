import { SchemaValidationResult } from "schema-validator";

/**
 * Updates the browser extension's icon.
 */
export default class IconPresenter {
	/**
	 * The id of the tab for which to update the icon.
	 *
	 * @protected
	 */
	protected readonly tabId: number;

	/**
	 * Presenter for updating the browser extension's icon.
	 *
	 * @param tabId The id of the tab for which to update the icon.
	 */
	constructor( tabId: number ) {
		this.tabId = tabId;
	}

	/**
	 * Sets the icon's image.
	 *
	 * @param icon Which icon to use.
	 *
	 * @protected
	 */
	protected setImage( icon: "green" | "grey" | "orange" | "red" ): void {
		chrome.browserAction.setIcon( {
			path: `../images/${ icon }.png`,
			tabId: this.tabId,
		} );
	}

	/**
	 * Sets the icon's badge.
	 *
	 * @param text The text within the icon's badge.
	 * @param color The color of the badge.
	 *
	 * @protected
	 */
	protected setBadge( text: string, color: "green" | "grey" | "orange" | "red" ): void {
		chrome.browserAction.setBadgeText( { text, tabId: this.tabId } );
		chrome.browserAction.setBadgeBackgroundColor( { color, tabId: this.tabId } );
	}

	/**
	 * Updates the icon.
	 *
	 * @param result The validation results to use.
	 */
	public render( result: SchemaValidationResult ): void {
		switch ( result.severity ) {
			case "error": {
				this.setImage( "red" );
				this.setBadge( result.failureCounts.error.toString(), "red" );
				break;
			}
			case "success": {
				this.setImage( "green" );
				this.setBadge( "0", "green" );
				break;
			}
			case "warning": {
				this.setImage( "orange" );
				this.setBadge( result.failureCounts.warning.toString(), "orange" );
				break;
			}
			default: {
				this.setImage( "grey" );
				this.setBadge( "", "grey" );
				break;
			}
		}
	}
}
