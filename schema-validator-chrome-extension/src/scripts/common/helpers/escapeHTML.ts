/**
 * Simple function to escape HTML for display reasons.
 *
 * @param unsafe The string to escape.
 *
 * @returns the escaped string.
 */
export function escapeHTML( unsafe: string ): string {
	return unsafe
		.replace( /&/g, "&amp;" )
		.replace( /</g, "&lt;" )
		.replace( />/g, "&gt;" )
		.replace( /"/g, "&quot;" )
		.replace( /'/g, "&#039;" );
}
