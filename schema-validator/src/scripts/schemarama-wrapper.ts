import { StructuredDataFailure, Validator as ShaclValidator } from "schemarama/shaclValidator";
import { schema_shapes_ttf } from "./datashapes.org/schemashapes.ttl";

export class SchemaValidator {

    protected definitions: string;

    /**
     * Creates a schema validator using the Shacl validator.
     * @param defintions the definitions to validate against. Default: automatically generated definitions from schema.org
     */
    __construct ( defintions: string = null ) {
        this.definitions = this.definitions || schema_shapes_ttf;
    }

	/**
     * Validates a schema string against schema.org definitions.
     * 
     * @param input The schema you wish to validate.
     * @returns {StructuredDataFailure} The validation results.
     */
    async validate( input: string ): Promise<[ StructuredDataFailure ]> {
		const validator = new ShaclValidator( this.definitions, null );
		
        const validation = await validator.validate( input ) || { failures: {} as [ StructuredDataFailure ] };

		return validation.failures;
	}
}
