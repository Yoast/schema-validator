import { StructuredDataFailure } from "../../common/values";

function result( failure: StructuredDataFailure ) {
	return `<article class="result ${ failure.severity }">
		<p>
			<strong>${ failure.property }</strong>: ${ failure.message }
		</p>
	</article>`;
}

export default result;
