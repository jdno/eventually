let url_param = new URL(window.location.href).searchParams.get("url");
let decoded_url = decodeURIComponent(url_param);
let host = new URL(decoded_url).hostname;

document.getElementById('eventually-button-js').addEventListener("click", unlock);
document.getElementById('eventually-url-js').innerText = host;

function unlock() {
  let data = {
    host: host,
    url: decoded_url,
    unlocked_at: Date.now()
  };

  browser.storage.local.set({[host]: data}).then(() => {
    window.location.replace(decoded_url);
  });
}
