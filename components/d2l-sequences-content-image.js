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
		<div>
            <img src="[[_fileLocation]]">
		</div>
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
			},
			title: {
				type: String,
				computed: '_getTitle(entity)'
			},
		};
	}
	_scrollToTop() {
		window.top.scrollTo(0, 0);
	}
	_getFileLocation(entity) {
		try {
			const fileActivity = entity.getSubEntityByClass('file-activity');
			const file = fileActivity.getSubEntityByClass('file');
			const link = file.getLinkByClass('pdf') || file.getLinkByClass('embed') || file.getLinkByRel('alternate');
			return link.href;
		} catch (e) {
			return '';
		}
	}
	_getTitle(entity) {
		return entity && entity.properties && entity.properties.title || '';
	}
}
customElements.define(D2LSequencesContentImage.is, D2LSequencesContentImage);
