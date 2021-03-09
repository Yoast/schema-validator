# Schema-Validator
This package wraps the google schemarama validator. 
The validator validates schema against a set of schema shapes included in this package; this set is customized and based off automatically generated shapes defined at datashapes.org.

## usage

```const validator = new SchemaValidator();
const results:[StructuredDataFailure] = await validator.validate( mySchemaAsAString );```
