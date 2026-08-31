(async function () {
  const container = document.getElementById('app');
  try {
    const { apiUrl } = await browser.storage.local.get('apiUrl');

    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('data', data);
  } catch (err) {
    console.error(err);
  }
})();
