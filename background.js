const TIMEOUT = 15 * 60 * 1000; // 15 minutes

function intercept(requestDetails) {
  let encoded_url = encodeURIComponent(requestDetails.url);
  let url = new URL(requestDetails.url);
  let host = url.hostname;

  let data_promise = browser.storage.local.get(host);

  return data_promise.then((items) => {
    let data = items[host];
    console.log(data.unlocked_at);

    if (typeof data == "undefined") {
      return redirect(encoded_url);
    }

    let unlocked_at = new Date(data.unlocked_at);

    if ((Date.now() - unlocked_at) > TIMEOUT) {
      return redirect(encoded_url);
    }
  }).catch(() => {
    return redirect(encoded_url);
  });
}

function redirect(url) {
  return {
    redirectUrl: chrome.extension.getURL("eventually.html?url=" + url)
  };
}

browser.webRequest.onBeforeRequest.addListener(
  intercept,
  {urls: ["<all_urls>"], types: ["main_frame"]},
  ["blocking"]
);
