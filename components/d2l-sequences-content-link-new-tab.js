import 'd2l-button/d2l-button.js';
import '../mixins/d2l-sequences-completion-tracking-mixin.js';
import './d2l-sequences-content-link.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { D2LSequencesContentLink } from './d2l-sequences-content-link.js';
/*
	@extends D2L.PolymerBehaviors.Sequences.LocalizeBehavior
*/

export class D2LSequencesContentLinkNewTab extends D2L.Polymer.Mixins.Sequences.CompletionTrackingMixin() {
	static get template() {
		return html`
		<style>
			.content-link-new-tab-container {
				padding-top: 100px;
				text-align: center;
				width: 550px;
				margin: auto;
			}

			.content-link-new-tab-container > * {
				margin: 25px 0;
			}

			.content-link-new-tab-container h3 {
				color: var(--d2l-color-celestine-plus-1);
			}

			#linkImage{
				margin-left:60px;
			}

		</style>
		<div class="content-link-new-tab-container">
			<img id="linkImage" src="../img/weblink-jump-image.svg"></img>
			<p>
				[[localize('openInNewTab')]]
			</p>
			<d2l-button primary="" on-click="_onclick">
				[[localize('openNew')]]
			</d2l-button>
		</div>
`;
	}

	static get is() {
		return 'd2l-sequences-content-link-new-tab';
	}

	static get properties() {
		return {
			href: {
				type: String,
				reflectToAttribute: true,
				notify: true,
				observer: '_scrollToTop'
			}
		};
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.finishCompletion();
	}

	_scrollToTop() {
		window.top.scrollTo(0, 0);
	}

	_getLinkLocation(entity) {
		try {
			const linkActivity = entity.getSubEntityByClass(D2LSequencesContentLink.contentClass);
			const link = linkActivity.getLinkByRel('about');
			return link.href;
		} catch (e) {
			return '';
		}
	}
	_onclick() {
		const location = this._getLinkLocation(this.entity);
		if (!location) {
			return;
		}

		this.startCompletion();
		return window.open(location);
	}
}
customElements.define(D2LSequencesContentLinkNewTab.is, D2LSequencesContentLinkNewTab);
