let url_param = new URL(window.location.href).searchParams.get("url");
let decoded_url = decodeURIComponent(url_param);
let host = new URL(decoded_url).hostname;

document.getElementById('eventually-url-js').innerText = host;
document.getElementById('eventually-link-js').setAttribute('href', decoded_url);
