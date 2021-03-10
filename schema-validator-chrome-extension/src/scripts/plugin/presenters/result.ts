import { StructuredDataFailure } from "../../common/values";

/**
 * Renders a validation result.
 *
 * @param failure The failure to render.
 *
 * @return The validation result.
 */
function result( failure: StructuredDataFailure ): string {
	return `<article class="result ${ failure.severity }"><p><strong> ${ failure.property }</strong>: ${ failure.message }</p></article>`;
}

export default result;
