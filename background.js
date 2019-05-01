function redirect(requestDetails) {
  let url = encodeURIComponent(requestDetails.url);

  return {
    redirectUrl: chrome.extension.getURL("eventually.html?url=" + url)
  };
}

browser.webRequest.onBeforeRequest.addListener(
  redirect,
  {urls: ["<all_urls>"], types: ["main_frame"]},
  ["blocking"]
);
