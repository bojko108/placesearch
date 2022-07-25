const geolocate = (place) => {
  chrome.tabs.create({
    url: `https://www.google.com/maps/search/${place}`,
  });
};

// geolocate from page context menu:
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'my_geolocate',
    title: 'Geolocate: %s',
    contexts: ['selection'],
  });
});
chrome.contextMenus.onClicked.addListener((e) => {
  geolocate(e.selectionText);
});

// geolocate from title bar button:
chrome.action.onClicked.addListener(() => {
  chrome.tabs.query(
    {
      currentWindow: true,
      active: true,
    },
    (tab) => {
      let query = prompt('Enter place name:');
      if (query) {
        geolocate(query);
      }
    }
  );
});

//geolocate from the address bar: keyword - gm
chrome.omnibox.onInputEntered.addListener((text) => {
  let qString = `https://www.google.com/maps/search/${text}`;
  chrome.tabs.query(
    {
      currentWindow: true,
      active: true,
    },
    (tab) => {
      chrome.tabs.update(tab[0].id, { url: qString });
    }
  );
});
