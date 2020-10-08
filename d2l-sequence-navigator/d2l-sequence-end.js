import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { ASVFocusWithinMixin } from '../mixins/asv-focus-within-mixin.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';

class D2LSequenceEnd extends ASVFocusWithinMixin(
	mixinBehaviors([
		D2L.PolymerBehaviors.Siren.EntityBehavior
	], PolymerElement)) {
	static get template() {
		return html`
			<style>
				#d2l-sequence-end-container {
					color: var(--d2l-color-ferrite);
					border-radius: 6px;
					padding: 20px 40px 20px 20px;
					position: relative;
					margin: 6px 0;
				}
				:host(:dir(rtl)) #d2l-sequence-end-container {
					padding: 20px 20px 20px 40px;
				}

				#d2l-sequence-end-container.d2l-asv-current {
					background-color: var(--d2l-color-gypsum);
					color: var(--d2l-color-celestine-minus-1);
				}

				#d2l-sequence-end-container.d2l-asv-focus-within,
				#d2l-sequence-end-container:focus:not(.d2l-asv-current) {
					box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px var(--d2l-color-celestine);
					background-color: var(--d2l-color-gypsum);
					color: var(--d2l-color-celestine-minus-1);
				}

				#d2l-sequence-end-container:hover {
					background-color: var(--d2l-color-gypsum);
					color: var(--d2l-color-celestine-minus-1);
					cursor: pointer;
				}

				.d2l-sequence-end-link {
					@apply --d2l-heading-3;
					color: var(--d2l-sequence-end-text-color);
					text-decoration: none;
					outline: none;
				}
			</style>
			<div id="d2l-sequence-end-container" class$="[[_containerClass]]" on-click="showEndOfLesson">
				<a on-click="showEndOfLesson"
					class="d2l-sequence-end-link"
					href="javascript:void(0)">
					[[endOfSequenceLangTerm]]
				</a>
			</div>
		`;
	}
	static get is() {
		return 'd2l-sequence-end';
	}
	static get properties() {
		return {
			href: {
				type: String
			},
			_containerClass:{
				type: String,
				computed: '_getContainerClass(currentActivity, href, focusWithin)'
			},
			currentActivity: {
				type: String,
				reflectToAttribute: true,
				notify: true
			},
			text:{
				type: String
			},
			endOfSequenceLangTerm: {
				type: String,
				computed: '_getEndOfSequenceLangTerm(entity)'
			}
		};
	}

	_getContainerClass(currentActivity, href, focusWithin) {
		const isSelected = href === currentActivity;
		return this._getTrueClass(focusWithin, isSelected);
	}

	showEndOfLesson() {
		this.currentActivity = this.href;
	}

	_getEndOfSequenceLangTerm(entity) {
		return entity && entity.properties && entity.properties.title || this.text || '';
	}
}
customElements.define(D2LSequenceEnd.is, D2LSequenceEnd);
