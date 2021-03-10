import { StructuredDataFailure } from "../../common/values";
import { escapeHTML } from "../../common/helpers";

/**
 * Presents a validation failure.
 */
export default class FailurePresenter {
	/**
	 * Renders the presenter.
	 *
	 * @param failure The failure to render.
	 *
	 * @returns The rendered presenter.
	 */
	render( failure: StructuredDataFailure ): string {
		return `<article class="result ${ escapeHTML( failure.severity || "" ) }">
		<p>
			<strong> ${ escapeHTML( failure.property || "" ) }</strong><br/>
			${ escapeHTML( failure.message || "" ) }
		</p>
	</article>`;
	}
}

