import { CompletionStatusMixin } from '../mixins/completion-status-mixin.js';
import { ASVFocusWithinMixin } from '../mixins/asv-focus-within-mixin.js';
import '@brightspace-ui/core/components/meter/meter-circle.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

class D2LEndOfLessonsProgress extends ASVFocusWithinMixin(CompletionStatusMixin()) {
	static get template() {
		return html`
		<style>
			:host {
				display: block;
			}

		</style>
		<d2l-meter-circle
						class="d2l-progress"
						value="[[completionCount.completed]]"
						max="[[completionCount.total]]"
						style="width:25%">
					</d2l-meter-circle>
`;
	}

	static get is() {
		return 'd2l-end-of-lessons-progress';
	}
	static get properties() {
		return {
			href: {
				type: String,
				reflectToAttribute: true,
				notify: true,
				observer: '_scrollToTop'
			},
			token: {
				type: String
			}
		};
	}
}
customElements.define(D2LEndOfLessonsProgress.is, D2LEndOfLessonsProgress);
