import 'polymer-google-drive-viewer/google-drive-viewer.js';
import '../mixins/d2l-sequences-automatic-completion-tracking-mixin.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
export class D2LSequencesContentLinkGoogledrive extends D2L.Polymer.Mixins.Sequences.AutomaticCompletionTrackingMixin() {
	static get template() {
		return html`
		<style>
			google-drive-viewer {
				position: absolute;
				top: 0;
				bottom: 0;
			}
		</style>
		<google-drive-viewer token= "[[token]]" href="[[_linkLocation]]"></google-drive-viewer>
	`;
	}

	static get is() {
		return 'd2l-sequences-content-link-googledrive';
	}
	static get properties() {
		return {
			href: {
				type: String,
				reflectToAttribute: true,
				notify: true,
				observer: '_scrollToTop'
			},
			previousHref: {
				type: String
			},
			_linkLocation: {
				type: String,
				computed: '_getLinkLocation(entity)'
			}
		};
	}
	_scrollToTop() {
		window.top.scrollTo(0, 0);
	}

	_getLinkLocation(entity) {
		try {
			const link = entity.getLinkByRel('describes');
			return link.href;
		} catch (e) {
			return '';
		}
	}
}
customElements.define(D2LSequencesContentLinkGoogledrive.is, D2LSequencesContentLinkGoogledrive);
