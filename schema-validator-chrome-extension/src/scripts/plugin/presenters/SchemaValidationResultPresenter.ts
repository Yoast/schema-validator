import { SchemaValidationResult } from "schema-validator";
import FailureListPresenter from "./FailureListPresenter";
import { StructuredDataFailure } from "../../common/values";


export default class SchemaValidationResultPresenter {
	generateReport( result: SchemaValidationResult ): Record<string, StructuredDataFailure[]> {
		const validationMap: Record<string, StructuredDataFailure[]> = {};

		result.failures.forEach(
			failure => {
				validationMap[ failure.shape ] = validationMap[ failure.shape ] || [];
				validationMap[ failure.shape ].push( failure );
			},
		);

		return validationMap;
	}

	render( result: SchemaValidationResult ): string {
		const report = this.generateReport( result );

		const lists = Object.keys( report ).map(
			shape => new FailureListPresenter().render( shape, report[ shape ] )
		);

		return lists.join( "" );
	}
}
