import { StructuredDataFailure, Validator as ShaclValidator } from "schemarama/shaclValidator";
import { schemaShapesTTF } from "./definitions/schemashapes.ttl";

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
     * Validates a schema string against schema.org definitions.
     *
     * @param input The schema you wish to validate.
     * @returns {StructuredDataFailure} The validation results.
     */
	async validate( input: string ): Promise<[ StructuredDataFailure ]> {
		const validator = new ShaclValidator( this.definitions, { annotations: null, subclasses: "" } );

		const validation = await validator.validate( input ) || { failures: {} as [ StructuredDataFailure ] };

		return validation.failures;
	}
}
