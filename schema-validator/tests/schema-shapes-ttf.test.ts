import { schemaShapesTTF } from "../src/scripts/definitions/schemashapes.ttl";

describe( "The schema_shapes_ttf definition ", () => {
	it( "contains 12114 occurrences of the word 'schema'", () => {
		const count = ( schemaShapesTTF.match( /schema/g ) || [] ).length;

		expect( count ).toEqual( 12114 );
	} );
} );
