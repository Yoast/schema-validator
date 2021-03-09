declare module "@schemarama/shaclValidator" {
    export type StructuredDataFailure = {
      property: string,
      message: string,
      severity: 'error'|'warning'|'info',
      shape: string
    }

    export type ShaclValidatorOptions = { 
        baseUrl: string | undefined
    };

    export class ShaclValidator {
        /**
         * @param {string} shaclSchema - shacl shapes in string format
         * @param {{
         *     annotations: object|undefined,
         *     subclasses: string
         * }} options
         */
        constructor(shaclSchema: string, options: {
                annotations: object | undefined;
                subclasses: string;
            });

        /**
         * @param {string|Store} data
         * @param {{baseUrl: string|undefined}} options
         * @returns {Promise<{baseUrl: string, store: Store, failures: [StructuredDataFailure]}>}
         */
        validate(data: string, options: ShaclValidatorOptions ): Promise<{ baseUrl: string; store: object; failures: [StructuredDataFailure]; }>;
    }
}