import { StructuredDataFailure } from "../values";

/**
 * Sorts the given failures based on their severity, errors at the top.
 *
 * @param failures The validation failures to sort.
 */
export function sortFailures( failures: StructuredDataFailure[] ): void {
	failures.sort( ( failure1: StructuredDataFailure ) => failure1.severity === "error" ? -1 : 1 );
}
