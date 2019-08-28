import './d2l-sequences-completion-tracking-mixin.js';
function AutomaticCompletionTrackingMixin() {
	return class extends D2L.Polymer.Mixins.Sequences.CompletionTrackingMixin() {

		static get properties() {
			return {
				href: {
					type: String,
					observer: '_onHrefChanged',
					reflectToAttribute: true,
					notify: true
				},
				_previousHref: {
					type: String
				},
				_finishCompletionCallback: {
					type: Function
				}
			};
		}

		static get observers() {
			return ['_entityUpdated(entity)'];
		}

		ready() {
			this._finishCompletionCallback = this.finishCompletion.bind(this);
		}

		connectedCallback() {
			super.connectedCallback();
			window.addEventListener('beforeunload', this._finishCompletionCallback);
		}

		disconnectedCallback() {
			super.disconnectedCallback();
			window.removeEventListener('beforeunload', this._finishCompletionCallback);
			this.finishCompletion();
		}

		_onHrefChanged(href, previousHref) {
			this._previousHref = previousHref;
		}

		_entityUpdated() {
			if (this.href !== this._previousHref) {
				this.finishCompletion();
				this.startCompletion();
				this._previousHref = this.href;
			}
		}
	};
}

window.D2L = window.D2L || {};
window.D2L.Polymer = window.D2L.Polymer || {};
window.D2L.Polymer.Mixins = window.D2L.Polymer.Mixins || {};
window.D2L.Polymer.Mixins.Sequences = window.D2L.Polymer.Mixins.Sequences || {};
window.D2L.Polymer.Mixins.Sequences.AutomaticCompletionTrackingMixin = AutomaticCompletionTrackingMixin;
