//global window variable needs to be made first, then call the MathJax script
//you might need to change the fontURL and the script source

//the config is basically a cut and paste from the github issue: https://github.com/mathjax/MathJax/issues/2195
//I think i can make it a bit better but it works for now

//one last thing: the config. uses mathjax type definitions that arent from the MathJax script below the config.
//You might need to import https://www.npmjs.com/package/@types/mathjax

window.MathJax = {
  chtml: {                                                                   
    fontURL: 'http://localhost:8080/node_modules/mathjax/es5/output/chtml/fonts/woff-v2/'  
  },
  loader: {
    load: ["input/mml", "output/chtml"]
  },
    startup: {
      ready: () => {
        //
        //  Get some MathJax objects from the MathJax global
        //
        //  (Ideally, you would turn this into a custom component, and
        //  then these could be handled by normal imports, but this is
        //  just an example and so we use an expedient method of
        //  accessing these for now.)
        //
        const mathjax = MathJax._.mathjax.mathjax;
        const HTMLAdaptor = MathJax._.adaptors.HTMLAdaptor.HTMLAdaptor;
        const HTMLHandler = MathJax._.handlers.html.HTMLHandler.HTMLHandler;
        const AbstractHandler = MathJax._.core.Handler.AbstractHandler.prototype;
        const startup = MathJax.startup;
  
        //
        //  Extend HTMLAdaptor to handle shadowDOM as the document
        //
        class ShadowAdaptor extends HTMLAdaptor {
          create(kind, ns) {
            const document = (this.document.createElement ? this.document : this.window.document);
            return (ns ?
                    document.createElementNS(ns, kind) :
                    document.createElement(kind));
          }
          text(text) {
            const document = (this.document.createTextNode ? this.document : this.window.document);
            return document.createTextNode(text);
          }
          head(doc) {
            return doc.head || (doc.firstChild || {}).firstChild || doc;
          }
          body(doc) {
            return doc.body || (doc.firstChild || {}).lastChild || doc;
          }
          root(doc) {
            return doc.documentElement || doc.firstChild || doc;
          }
        }
  
        //
        //  Extend HTMLHandler to handle shadowDOM as document
        //
        class ShadowHandler extends HTMLHandler {
          create(document, options) {
            const adaptor = this.adaptor;
            if (typeof(document) === 'string') {
              document = adaptor.parse(document, 'text/html');
            } else if ((document instanceof adaptor.window.HTMLElement ||
                        document instanceof adaptor.window.DocumentFragment) &&
                       !(document instanceof window.ShadowRoot)) {
              let child = document;
              document = adaptor.parse('', 'text/html');
              adaptor.append(adaptor.body(document), child);
            }
            //
            //  We can't use super.create() here, since that doesn't
            //    handle shadowDOM correctly, so call HTMLHandler's parent class
            //    directly instead.
            //
            return AbstractHandler.create.call(this, document, options);
          }
        }
  
        //
        //  Register the new handler and adaptor
        //
        startup.registerConstructor('HTMLHandler', ShadowHandler);
        startup.registerConstructor('browserAdaptor', () => new ShadowAdaptor(window));
  
        //
        //  A service function that creates a new MathDocument from the
        //  shadow root with the configured input and output jax, and then
        //  renders the document.  The MathDocument is returned in case
        //  you need to rerender the shadowRoot later.
        //
        MathJax.typesetShadow = function (root) {
          const InputJax = startup.getInputJax();
          const OutputJax = startup.getOutputJax();
          const html = mathjax.document(root, {InputJax, OutputJax});
          html.render();
          return html;
        }
  
        //
        //  Now do the usual startup now that the extensions are in place
        //
        MathJax.startup.defaultReady();
      }
    }
  };
  
  (function () {
    var script = document.createElement('script');
    script.src = 'http://localhost:8080/node_modules/mathjax/es5/mml-chtml.js';
    script.async = true;
    document.head.appendChild(script);
  })();