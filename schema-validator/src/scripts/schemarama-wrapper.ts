import { StructuredDataFailure, Validator as ShaclValidator } from "schemarama/shaclValidator";
import { parseJsonLd } from "schemarama";
import { schemaShapesTTF } from "./definitions/schemashapes.ttl";

export type ValidationCounts = {
	error: number,
	warning: number,
	info: number
}

export type SchemaValidationResult = {
	severity: "success" | "warning" | "error",
	failureCounts: ValidationCounts,
	failures: StructuredDataFailure[]
}

/**
 * Validates Schema using the google schemarama ShaclValidator.
 */
export class SchemaValidator {
	protected definitions: string;

	/**
	 * Creates a schema validator using the Shacl validator.
	 * @param definitions the definitions to validate against. Default: automatically generated definitions from schema.org
	 */
	constructor( definitions: string = null ) {
		this.definitions = definitions || schemaShapesTTF;
	}

	/**
	 * Analyzes a set of validation failures to determine the severity
	 * @param failures The validation failures.
	 * @returns {"success" | "warning" | "error"} The severity of the validation.
	 */
	protected getSeverity( failures: [ StructuredDataFailure ] ): "success" | "warning" | "error" {
		let severity = "success";

		if ( failures.some( f => f.severity === "warning" ) ) {
			severity = "warning";
		}

		if ( failures.some( f => f.severity === "error" ) ) {
			severity = "error";
		}

		return severity as "success" | "warning" | "error";
	}

	/**
	 * Counts the number of errors, warnings and info messages in the validation results.
	 * @param failures The failures.
	 * @returns The amount of errors, warnings and info messages
	 */
	protected getFailureCounts( failures: StructuredDataFailure[] ): ValidationCounts {
		const summary: ValidationCounts = {
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

	/**
	 * Validates a schema string against schema.org definitions.
	 *
	 * @param input The schema you wish to validate.
	 * @param url   The url this schema belongs to.
	 * @returns {SchemaValidationResult} The validation results.
	 */
	public async validate( input: string, url: string ): Promise<SchemaValidationResult> {
		const transformedInput = await parseJsonLd( input, url );
		const validator = new ShaclValidator( this.definitions, { annotations: null, subclasses: "" } );

		const validation = await validator.validate( transformedInput ) || { failures: {} as [ StructuredDataFailure ] };

		const output: SchemaValidationResult = {
			severity: this.getSeverity( validation.failures ),
			failureCounts: this.getFailureCounts( validation.failures ),
			failures: validation.failures,
		};

		return output;
	}
}
