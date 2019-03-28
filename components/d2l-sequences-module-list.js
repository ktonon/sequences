import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import '@polymer/iron-collapse/iron-collapse.js';
import 'd2l-link/d2l-link.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-icons/tier1-icons.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import './d2l-sequences-module-name.js';
import '../localize-behavior.js';

/**
 * @customElement
 * @polymer
 */
class D2lSequenceModuleList extends mixinBehaviors([D2L.PolymerBehaviors.Siren.EntityBehavior, D2L.PolymerBehaviors.Sequences.LocalizeBehavior], PolymerElement) {
	static get template() {
		return html`
			<style include="d2l-typography-shared-styles">
				.d2l-sequences-module-list-container {
					background-color: #ffffff;
				}
				.d2l-sequences-module-list-list {
					border-bottom: 1px solid var(--d2l-color-sylvite);
					border-top: 1px solid var(--d2l-color-sylvite);
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
				.d2l-sequences-module-list-list li d2l-link d2l-sequences-module-name {
					@apply --d2l-body-compact-text;
					color: var(--d2l-color-tungsten);
					display: block;
					letter-spacing: 0.4px;
					line-height: 1.19;
					padding: 13px 20px;
				}

				.d2l-sequences-module-list-list li d2l-link:hover d2l-sequences-module-name {
					background-color: var(--d2l-color-regolith);
					border-bottom: 1px solid var(--d2l-color-mica);;
					border-top: 1px solid var(--d2l-color-mica);;
					padding: 12px 20px;
				}
				.d2l-sequences-module-list-list li d2l-sequences-module-name::before {
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
					color: var(--d2l-color-tungsten);
					letter-spacing: 0.5px;
					text-decoration: none;
				}
				.d2l-sequences-module-list-collapse-title:hover span {
					text-decoration: underline;
				}
				.d2l-sequences-module-list-collapse-title:hover {
					background-color: var(--d2l-color-regolith);
				}
			</style>
			<div class="d2l-sequences-module-list-container">
				<iron-collapse id="collapse" no-animation="[[noAnimation]]" opened="[[opened]]">
					<ol class="d2l-sequences-module-list-list">
						<template is="dom-repeat" items="[[_modules]]">
							<li>
								<d2l-link href="#">
									<d2l-sequences-module-name module$="[[localize('module')]]" href="[[item]]" token="[[token]]"></d2l-sequences-module-name>
								</d2l-link>
							</li>
						</template>
					</ol>
				</iron-collapse>
				<a class="d2l-sequences-module-list-collapse-title" href="javascript:void(0)" id="trigger" on-click="toggle" aria-controls="collapse" role="button">
					<d2l-icon class="d2l-sequences-module-list-vertical-flip" icon="[[_toggle(opened, collapseIcon, expandIcon)]]"></d2l-icon>
					<span>[[_collapseTitle(_modules, opened)]]</span>
				</a>
			<div>
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
				value: () => []
			}
		};
	}
	static get observers() {
		return [
			'_handleModuleData(entity)'
		];
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

	_handleModuleData(modules) {
		this._modules = modules && modules.getSubEntities
			? modules.getSubEntities('https://api.brightspace.com/rels/sequenced-activity').map(e => e.href)
			: [];
	}

	_collapseTitle(modules, opened) {
		const showOrHide = !opened ? 'showModules' : 'hideModules';
		return this.localize(showOrHide, 'numberOfModules', modules.length);
	}

}

window.customElements.define('d2l-sequences-module-list', D2lSequenceModuleList);
