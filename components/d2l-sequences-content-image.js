import '../mixins/d2l-sequences-automatic-completion-tracking-mixin.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

export class D2LSequencesContentImage extends D2L.Polymer.Mixins.Sequences.AutomaticCompletionTrackingMixin() {
	static get template() {
		return html`
		<style>
		    img {
                max-width: 100%;
                height: auto;
			}
		</style>
		<img src="[[_fileLocation]]">
`;
	}

	static get is() {
		return 'd2l-sequences-content-image';
	}
	static get properties() {
		return {
			href: {
				type: String,
				reflectToAttribute: true,
				notify: true,
				observer: '_scrollToTop'
			},
			_fileLocation: {
				type: String,
				computed: '_getFileLocation(entity)'
			}
		};
	}
	_scrollToTop() {
		window.top.scrollTo(0, 0);
	}
	_getFileLocation(entity) {
		if (entity) {
			const fileActivity = entity.getSubEntityByClass('file-activity');
			const file = fileActivity.getSubEntityByClass('file');
			const link = file.getLinkByClass('embed') || file.getLinkByRel('alternate');
			return link.href;
		} else {
			return '';
		}
	}
}
customElements.define(D2LSequencesContentImage.is, D2LSequencesContentImage);
