import FailurePresenter from "./FailurePresenter";
import { StructuredDataFailure } from "../../common/values";
import { escapeHTML, sortFailures } from "../../common/helpers";

/**
 * Presenter for a list of validation failures.
 */
export default class FailureListPresenter {
	/**
	 * Renders the presenter.
	 *
	 * @param shape The shape to which the failures belong.
	 * @param failures The schema validation failures.
	 *
	 * @returns The rendered presenter.
	 */
	render( shape: string, failures: StructuredDataFailure[] ): string {
		sortFailures( failures );

		const renderedFailures = failures.map(
			failure => new FailurePresenter().render( failure ),
		);

		let badgeColor = "red";
		let badgeAmount = failures.filter( failure => failure.severity === "error" ).length;
		if ( badgeAmount === 0 ) {
			badgeColor = "orange";
			badgeAmount = failures.filter( failure => failure.severity === "warning" ).length;
		}

		return `
			<details>
				<summary>${ escapeHTML( shape || "" ) }
					${ badgeAmount ? `<span class="badge ${ badgeColor }">${ badgeAmount }</span>` : "" }
				</summary>
				${ renderedFailures.join( "" ) }
			</details>
		`;
	}
}
