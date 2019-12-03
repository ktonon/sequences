import '../mixins/d2l-sequences-automatic-completion-tracking-mixin.js';
import 'd2l-pdf-viewer/d2l-pdf-viewer.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
export class D2LSequencesContentFileHtml extends D2L.Polymer.Mixins.Sequences.AutomaticCompletionTrackingMixin() {
	static get template() {
		return html`
		<style>
			.d2l-sequences-scroll-container {
				-webkit-overflow-scrolling: touch;
				overflow-y: auto;
				height: 100%;
			}
			iframe {
				width: 100%;
				height: calc(100% - 12px);
				overflow: hidden;
			}
		</style>
		<template is="dom-if" if="[[_usePdfViewer]]">
			<d2l-pdf-viewer src="[[_fileLocation]]"></d2l-pdf-viewer>
		</template>
		<template is="dom-if" if="[[!_usePdfViewer]]">
			<div class="d2l-sequences-scroll-container">
				<iframe id="content" frameborder="0" src$="[[_fileLocation]]" title$="[[title]]"></iframe>
			</div>
		</template>
`;
	}

	static get is() {
		return 'd2l-sequences-content-file-html';
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
			_navigateMultiPageFileListener: Function,
			_usePdfViewer: {
				type: Boolean,
				computed: '_isPdf(entity)'
			}
		};
	}
	ready() {
		super.ready();
		this._navigateMultiPageFileListener = this._navigateMultiPageFile.bind(this);
	}

	connectedCallback() {
		super.connectedCallback();
		window.addEventListener('d2l-sequence-viewer-multipage-navigation', this._navigateMultiPageFileListener);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener('d2l-sequence-viewer-multipage-navigation', this._navigateMultiPageFileListener);
		window.postMessage(JSON.stringify({ handler: 'd2l.nav.reset' }), '*');
	}

	_scrollToTop() {
		window.top.scrollTo(0, 0);
	}

	_getFileLocation(entity) {
		const file = this._getFileEntity(entity);
		const link = file
			? file.getLinkByClass('pdf') || file.getLinkByClass('embed') || file.getLinkByRel('alternate')
			: { href: '' };
		return link.href;
	}
	_getTitle(entity) {
		return entity && entity.properties && entity.properties.title || '';
	}

	_navigateMultiPageFile(e) {
		const iframe = this.shadowRoot.querySelector('iframe');
		if (iframe && iframe.contentWindow) {
			iframe.contentWindow.postMessage(JSON.stringify({
				handler: 'd2l.nav.client',
				action: e.detail
			}), '*');
		}
	}

	_isPdf(entity) {
		const file = this._getFileEntity(entity);
		return file
			? file.hasLinkByClass('pdf')
			: false;
	}

	_getFileEntity(entity) {
		try {
			const fileActivity = entity.getSubEntityByClass('file-activity');
			return fileActivity.getSubEntityByClass('file');
		} catch (e) {
			return null;
		}
	}
}
customElements.define(D2LSequencesContentFileHtml.is, D2LSequencesContentFileHtml);
