import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import './d2l-sequences-content-mathjax-config.js' //main configuration for MathJax

export class D2LSequencesContentMathJaxWrapper extends mixinBehaviors([
	D2L.PolymerBehaviors.Siren.EntityBehavior,
	D2L.PolymerBehaviors.Siren.SirenActionBehaviorImpl
], PolymerElement) {

  //this is here to initialize this component's shadow dom
	static get template() {
    return html``;
	}

  //this is the content passed to the component. In this case, it's the [[description]] of the module. I want to eventually get rid of this so we can just look
  // at the innerHTML of the component rather than loading the content from a property
  static get properties() {
    return {
      content: {
          type: Object,
          observer: '_activeChanged'
      }
    }
  }

  //if the description changes, typset the shadow dom
  _activeChanged(newValue, oldValue) {
    this.shadowRoot.innerHTML =
      '<mjx-doc><mjx-head></mjx-head><mjx-body>' + newValue + '</mjx-body></mjx-doc>'; //these tags will ideally be in the template() 
    MathJax.typesetShadow(this.shadowRoot);
  }

  static get is() {
    return 'd2l-mathjax';
  }
}

customElements.define(D2LSequencesContentMathJaxWrapper.is, D2LSequencesContentMathJaxWrapper);
