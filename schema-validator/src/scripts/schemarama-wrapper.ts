import { StructuredDataFailure, Validator as ShaclValidator } from "schemarama/shaclValidator";
import { schema_shapes_ttf } from "./datashapes.org/schemashapes.ttl";

export class SchemaValidator {
	async validate( input: string ): Promise<[ StructuredDataFailure ]> {
		const validator = new ShaclValidator( schema_shapes_ttf, null );
		const validation = await validator.validate( input );
		return validation.failures;
	}
}
