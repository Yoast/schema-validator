import { SchemaValidationResult } from "schema-validator";
import FailurePresenter from "./FailurePresenter";

/**
 * Presenter for a list of validation failures.
 */
export default class FailureListPresenter {
	/**
	 * Element in which to render the failures.
	 *
	 * @protected
	 */
	protected element: HTMLElement;

	/**
	 * Presenter for a list of validation failures.
	 *
	 * @param element The element in which to render the failures.
	 */
	constructor( element: HTMLElement ) {
		this.element = element;
	}

	/**
	 * Renders the presenter.
	 *
	 * @param report The schema validation result.
	 */
	render( report: SchemaValidationResult ): void {
		this.element.innerHTML = report.failures.map(
			failure => {
				const resultPresenter = new FailurePresenter();
				return resultPresenter.render( failure );
			},
		).join( "" );
	}
}
