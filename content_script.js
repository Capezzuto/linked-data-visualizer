(function () {
  async function init() {
    try {
      // on new page loads, the "APIs & other identifiers" section is populated slightly later than other parts of the page
      // MutationObserver tracks nodes being added to wait for this data to become available
      // However, if page is cached, particularly when using browser history (i.e., Back and Forward buttons),
      // the section in question might already be populated and the MutationObserver logic will not run
      let apiUrl;
      let apiLinkElem = document.querySelector(
        '.m-technical-data__metadata-field a[href^="https://data.getty.edu/museum/collection/"]:not([href*=sparql])',
      );
      if (apiLinkElem) {
        apiUrl = apiLinkElem.href;
      } else {
        apiUrl = await new Promise((resolve, reject) => {
          const appObserver = new MutationObserver((mutations) => {
            let apiLinkElem;
            for (const mutation of mutations) {
              if (mutation.target.classList?.contains('m-technical-data__metadata-fields')) {
                apiLinkElem = mutation.target.querySelector(
                  '.m-technical-data__metadata-field a[href^="https://data.getty.edu/museum/collection/"]:not([href*=sparql])',
                );
                if (apiLinkElem) {
                  appObserver.disconnect();
                  resolve(apiLinkElem.href);
                  break;
                }
              }
            }
          });
          appObserver.observe(document.getElementById('app'), { childList: true, subtree: true, attributes: false });
        });
      }

      if (apiUrl) {
        await browser.storage.local.set({ apiUrl });
      }

      // document does not completely refresh, so DOMContentLoaded event will not
      // fire except on initial navigation;
      // to track view changes, pageUpdateObserver checks for changes to
      // container element's children, which indicates a new route being loaded
      const pageUpdateObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.addedNodes.length) {
            const mdContainer = mutation.addedNodes[0].querySelector?.(
              '.m-technical-data .m-technical-data__metadata-fields',
            );
            if (mdContainer) {
              pageUpdateObserver.disconnect();
              init();
              break;
            }
          }
        }
      });

      const mainContainer = document.querySelector('.gui-container.app-co');
      pageUpdateObserver.observe(mainContainer, { childList: true });
    } catch (err) {
      console.error(err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('load', () => {
      init();
    });
  } else {
    init();
  }
})();
