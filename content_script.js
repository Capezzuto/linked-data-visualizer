(function () {
  function init() {
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
            console.log('apiLinkElem', apiLinkElem);
            break;
          }
        }
      }
    });

    observer.observe(metadataContainer, { childList: true, attributes: false });
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
