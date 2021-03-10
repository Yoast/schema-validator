declare module "schemarama" {

	export type Store = unknown;

	export function parseJsonLd( text: string, baseUrl: string ): Promise<Store>;
}

declare module "schemarama/shaclValidator" {
	import { Store } from "schemarama";
	export type StructuredDataFailure = {
		property: string,
		message: string,
		severity: "error" | "warning" | "info",
		shape: string
	}

	export type ShaclValidatorOptions = {
		baseUrl: string | undefined
	};

	export class Validator {
		/**
		 * @param {string} shaclSchema - shacl shapes in string format
		 * @param {{
		 *     annotations: object|undefined,
		 *     subclasses: string
		 * }} options
		 */
		constructor( shaclSchema: string, options: {
			annotations: Record<string, unknown> | undefined;
			subclasses: string;
		} );

		/**
		 * @param {string|Store} data
		 * @param {{baseUrl: string|undefined}} options
		 * @returns {Promise<{baseUrl: string, store: Store, failures: [StructuredDataFailure]}>}
		 */
		validate( data: string | Store,
				  options?: ShaclValidatorOptions ): Promise<{
			baseUrl: string; store: Record<string, unknown>; failures: [ StructuredDataFailure ];
		}>;
	}
}


