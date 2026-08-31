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

      await browser.storage.local.set({ apiUrl });
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
