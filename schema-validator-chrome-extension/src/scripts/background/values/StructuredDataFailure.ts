interface StructuredDataFailure {
	property: string,
	message: string,
	severity: "error" | "warning" | "info",
	shape: string
}

export default StructuredDataFailure;
