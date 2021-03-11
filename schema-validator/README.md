# Schema-Validator

This package wraps the google schemarama validator. The validator validates schema against a set of schema shapes
included in this package; this set is customized and based off automatically generated shapes defined at datashapes.org.

## Usage

```ts
import { SchemaValidator, SchemaValidationResult } from "schema-validator/dist/scripts";

const schema = {
	"@type": "...",
	// Some schema...
};

const input = JSON.stringify( schema );

const validator: SchemaValidator = new SchemaValidator();
const results: SchemaValidationResult = await validator.validate( input );
```

## Building
Run `yarn build` to build the TypeScript.
