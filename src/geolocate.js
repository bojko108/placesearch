let geolocate = (place) => {
    chrome.tabs.create({
        url: `https://www.google.com/maps/search/${place}`
    });
};

// geolocate from title bar button:
chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, (tab) => {
        let query = prompt('Enter a place name:');
        if (query) {
            geolocate(query);
        }
    });
});

// geolocate from page context menu:
chrome.contextMenus.create({
    title: 'Geolocate: %s',
    contexts: ['selection'],
    onclick: (info) => {
        geolocate(info.selectionText);
    }
});

//geolocate from the address bar: keyword - gm
chrome.omnibox.onInputEntered.addListener(
    (text) => {
        let qString = `https://www.google.com/maps/search/${text}`;
        chrome.tabs.query({
            'currentWindow': true,
            'active': true
        }, (tab) => {
            chrome.tabs.update(
                tab[0].id, { 'url': qString }
            );
        });
    }
);