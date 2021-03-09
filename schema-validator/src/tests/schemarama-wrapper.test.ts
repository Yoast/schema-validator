import { schema_shapes_ttf } from "../scripts/datashapes.org/schemashapes.ttl";

describe( "The schema_shapes_ttf definition ", () => {
    it( "contains 12114 occurrences of the word 'schema'", () => {
        const count = (schema_shapes_ttf.match( /schema/g ) || []).length;
        
        expect( count ).toEqual( 12114 );
    } );
} );