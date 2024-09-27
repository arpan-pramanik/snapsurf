chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.msg === "clearCache") {
        toclean({origins: request.origins, data: request.data})
    }
    sendResponse({farewell: true});
});

function toclean() {
    chrome.browsingData.remove({
        "since": 0,
        "originTypes": {
          "unprotectedWeb": true,
          "protectedWeb": true,
          "extension": true
        }
      }, {
        "appcache": true,
        "cache": true,
        "cacheStorage": true,
        "cookies": true
      });
}


  