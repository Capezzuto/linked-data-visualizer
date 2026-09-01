(function () {
  async function init() {
    try {
      const apiUrl = await new Promise((resolve, reject) => {
        const metadataContainer = document.querySelector('.m-technical-data .m-technical-data__metadata-fields');
        // metadata children seem to be populated later in page load, so wait for API link to become available
        const observer = new MutationObserver((mutations) => {
          let apiLinkElem;
          for (const mutation of mutations) {
            const firstAddedNode = mutation.addedNodes[0];
            if (firstAddedNode?.classList?.contains('m-technical-data__metadata-field')) {
              // get link to API without targeting link to Query Builder
              apiLinkElem = firstAddedNode.querySelector(
                '.m-technical-data__metadata-field a[href^="https://data.getty.edu/museum/collection/"]:not([href*=sparql])',
              );
              if (apiLinkElem) {
                observer.disconnect();
                break;
              }
            }
          }
          apiLinkElem ? resolve(apiLinkElem.href) : reject(new Error('No API link element detected'));
        });
        observer.observe(metadataContainer, { childList: true, attributes: false });
      });

      // const apiUrl = apiElem.href;
      await browser.storage.local.set({ apiUrl });

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
    document.addEventListener('DOMContentLoaded', () => {
      console.log('loaded');
      init();
    });
  } else {
    init();
  }
})();
