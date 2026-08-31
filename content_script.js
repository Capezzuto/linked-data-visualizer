(function () {
  function init() {
    const metadataContainer = document.querySelector('.m-technical-data .m-technical-data__metadata-fields');
    console.log('metadataContainer', metadataContainer);
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
