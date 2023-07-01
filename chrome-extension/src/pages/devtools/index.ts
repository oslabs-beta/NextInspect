import { IChromeApiNetworkObject } from "../../types/types";

function convertToEpoch(dateString: string):number {
  const date = new Date(dateString);
  const epochTime = date.getTime();
  return epochTime;
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
      const networkObject: IChromeApiNetworkObject = {};
      if (request.request.httpVersion === 'chrome-extension') return;
      console.log(request);
      networkObject.method = request.request.method;
      networkObject.protocol = request.request.httpVersion;
      networkObject.size = request.response.bodySize;
      networkObject.status = request.response.status;
      networkObject.startTime = convertToEpoch(request.startedDateTime);
      networkObject.time = request.time;
      networkObject.urlEndpoint = request.request.url;
      networkObject.type = request._resourceType as string;;
      networkObject.initiator = request._initiator;
      chrome.runtime.sendMessage(networkObject);
    }
  )

} catch (error) {
  console.log(error);
}


