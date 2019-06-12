import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { EntityMixin } from 'siren-sdk/src/mixin/entity-mixin.js';
import { SequenceEntity } from 'siren-sdk/src/sequences/SequenceEntity.js';
import 'd2l-sequence-navigator/components/d2l-completion-status.js';
import '@polymer/iron-collapse/iron-collapse.js';
import 'd2l-link/d2l-link.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-icons/tier1-icons.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import '../localize-behavior.js';

const behaviors = [
	D2L.PolymerBehaviors.Sequences.LocalizeBehavior,
	D2L.PolymerBehaviors.Siren.EntityBehavior
];

/**
 * @customElement
 * @polymer
 */
class D2lSequenceModuleList extends mixinBehaviors(behaviors, EntityMixin(PolymerElement)) {
	static get template() {
		return html`
			<style include="d2l-typography-shared-styles">
				.d2l-sequences-module-list-container {
					background-color: #ffffff;
					border-bottom-left-radius: 6px;
					border-bottom-right-radius: 6px;
					border-top: 1px solid var(--d2l-color-sylvite);
				}
				.d2l-sequences-module-list-list {
					border-bottom: 1px solid var(--d2l-color-sylvite);
					counter-reset: d2l-sequence-module-list-counter;
					list-style: none;
					margin: 0;
					padding: 12px 0;
					position:relative;
					width: 100%;
				}
				.d2l-sequences-module-list-list li {
					box-sizing: content-box;
					counter-increment: d2l-sequence-module-list-counter;
					margin: 0 0 -1px 0;
					width: 100%;
				}
				.d2l-sequences-module-list-list li:first-child {
					margin: -1px 0 -1px 0;
				}
				.d2l-sequences-module-list-list li d2l-link div {
					@apply --d2l-body-compact-text;
					color: var(--d2l-color-ferrite);
					display: block;
					letter-spacing: 0.4px;
					line-height: 1.19;
					padding: 13px 20px;
				}
				.d2l-sequences-module-list-list li d2l-link d2l-icon {
					float: right;
				}
				.d2l-sequences-module-list-list li d2l-link {
					--d2l-link-hover_-_color: var(--d2l-color-ferrite);
					display: block;
				}
				.d2l-sequences-module-list-list li d2l-link:hover div {
					background-color: var(--d2l-color-regolith);
					border-bottom: 1px solid var(--d2l-color-mica);
					border-top: 1px solid var(--d2l-color-mica);
					padding: 12px 20px;
				}
				.d2l-sequences-module-list-list li div::before {
					content: attr(module) " " counter(d2l-sequence-module-list-counter) ": ";
				}
				.d2l-sequences-module-list-vertical-flip {
					-moz-transform: scale(1, -1);
					-o-transform: scale(1, -1);
					-webkit-transform: scale(1, -1);
					transform: scale(1, -1);
				}
				.d2l-sequences-module-list-collapse-title d2l-icon {
					margin: 12px 7px 12px 12px;
				}
				.d2l-sequences-module-list-collapse-title {
					align-items: center;
					display: flex;
				}
				.d2l-sequences-module-list-collapse-title,
				.d2l-sequences-module-list-collapse-title:visited,
				.d2l-sequences-module-list-collapse-title:hover {
					@apply --d2l-body-compact-text;
					color: var(--d2l-color-ferrite);
					letter-spacing: 0.5px;
					text-decoration: none;
				}
				.d2l-sequences-module-list-collapse-title:hover span {
					text-decoration: underline;
				}
				.d2l-sequences-module-list-collapse-title:hover {
					background-color: var(--d2l-color-regolith);
				}
				.d2l-sequences-module-list-list d2l-link[focus=focus],
				.d2l-sequences-module-list-collapse-title[focus=focus] {
					border-color: rgba(0, 111, 191, 0.4);
					border-radius: 6px;
					box-shadow: 0 0 0 4px rgba(0, 111, 191, 0.3);
					outline : none;
					position: relative;
					z-index: 5;
				}
			</style>
			<template is="dom-if" if="[[_hasModules(_modules)]]">
			<div class="d2l-sequences-module-list-container">
				<iron-collapse id="collapse" no-animation="[[noAnimation]]" opened="[[opened]]">
					<ol class="d2l-sequences-module-list-list">
						<template is="dom-repeat" items="[[_modules]]">
							<li>
								<d2l-link href$="[[item.href]]" on-focus="_onFocus" on-blur="_onBlur">
									<div module$="[[localize('module')]]">
										<span>[[item.title]]</span>
										<d2l-icon hidden$="[[!item.completed]]" aria-label$="[[localize('completed')]]" icon="d2l-tier1:check"></d2l-icon>
									</div>
								</d2l-link>
							</li>
						</template>
					</ol>
				</iron-collapse>
				<a class="d2l-sequences-module-list-collapse-title" href="javascript:void(0)" id="trigger" on-click="toggle" aria-controls="collapse" role="button" on-focus="_onFocus" on-blur="_onBlur">
					<d2l-icon class="d2l-sequences-module-list-vertical-flip" icon="[[_toggle(opened, collapseIcon, expandIcon)]]"></d2l-icon>
					<span>[[_collapseTitle(_modules, opened)]]</span>
				</a>
			<div>
			</template>
		`;
	}

	static get properties() {
		return {
			opened: {
				type: Boolean,
				value: false,
				notify: true,
				reflectToAttribute: true
			},
			expandIcon: {
				type: String,
				value: 'd2l-tier1:arrow-expand'
			},
			collapseIcon: {
				type: String,
				value: 'd2l-tier1:arrow-collapse'
			},
			_modules: {
				type: Array,
				value: function() { return []; }
			}
		};
	}
	static get observers() {
		return [
			'_onSequenceRootChange(_entity)'
		];
	}
	constructor() {
		super();
		this._setEntityType(SequenceEntity);
	}
	open() {
		if (this.disabled) {
			return;
		}
		this.opened = true;
	}
	close() {
		if (this.disabled) {
			return;
		}
		this.opened = false;
	}

	toggle() {
		if (this.disabled) {
			return;
		}
		if (this.opened) {
			this.close();
		} else {
			this.open();
		}
	}

	_toggle(cond, t, f) {
		return cond ? t : f;
	}

	_onSequenceRootChange(sequenceRoot) {
		const modulesBySequence = [];
		sequenceRoot.onSubSequencesChange((subSequence) => {
			modulesBySequence[subSequence.index()] = {
				title: subSequence.title(),
				href: subSequence.sequenceViewerApplicationHref(),
				entityHref: subSequence.self()
			};

			this._modules = modulesBySequence.filter(element => typeof(element) !== 'undefined');
		});
	}

	_collapseTitle(modules, opened) {
		const showOrHide = !opened ? 'showModules' : 'hideModules';
		return this.localize(showOrHide, 'numberOfModules', modules.length);
	}

	_hasModules(modules) {
		return !!modules.length;
	}
	_onFocus(e) {
		e.srcElement && e.srcElement.setAttribute && e.srcElement.setAttribute('focus', 'focus');
	}
	_onBlur(e) {
		e.srcElement && e.srcElement.setAttribute && e.srcElement.removeAttribute('focus', 'focus');
	}

}

window.customElements.define('d2l-sequences-module-list', D2lSequenceModuleList);
