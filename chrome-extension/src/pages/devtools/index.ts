type NetworkObject = {
  method?: string,
  protocol?: string,
  size?: number,
  status?: number,
  startTime?: string,
  time?: number,
  urlEndpoint?: string,
  type?: string,
  initiator?: string | null, 
}

try {
  chrome.devtools.panels.create(
    'NextInspect',
    'icon.png',
    'src/pages/panel/index.html'
  );

  //panel.onShown
    chrome.devtools.network.onRequestFinished.addListener(
      function(request) {
        const networkObject: NetworkObject = {};
        if (request.request.httpVersion === 'chrome-extension') return;
        networkObject.method = request.request.method;
        networkObject.protocol = request.request.httpVersion;
        networkObject.size = request.response.bodySize;
        networkObject.status = request.response.status;
        networkObject.startTime = request.startedDateTime;
        networkObject.time = request.time;
        networkObject.urlEndpoint = request.request.url;
        networkObject.type = request.response.content.mimeType;
        networkObject.initiator = request._initiator;
        chrome.runtime.sendMessage(networkObject);
      }
    )

} catch (error) {
  console.log(error);
}


