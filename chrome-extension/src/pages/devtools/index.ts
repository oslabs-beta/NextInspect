import {IChromeApiData} from '../../types/types.ts'
import convertToEpoch from '../app/functions/convertToEpoch.ts';

try {
  chrome.devtools.panels.create(
    'NextInspect',
    'icon.png',
    'src/pages/panel/index.html'
  );


  //panel.onShown
    // chrome.devtools.network.onRequestFinished.addListener(
    //   function(request) {
    //     const networkObject: IChromeApiData = {};
    //     if (request.request.httpVersion === 'chrome-extension') return;
    //     networkObject.method = request.request.method;
    //     networkObject.protocol = request.request.httpVersion;
    //     networkObject.size = request.response.bodySize;
    //     networkObject.status = request.response.status;
    //     networkObject.startTime = convertToEpoch(request.startedDateTime);
    //     networkObject.time = request.time;
    //     networkObject.urlEndpoint = request.request.url;
    //     networkObject.type = request.response.content.mimeType;
    //     networkObject.initiator = request._initiator;
    //     chrome.runtime.sendMessage(networkObject);
    //   }
    // )

    chrome.devtools.network.onRequestFinished.addListener(
      function(request) {
        const networkObject: IChromeApiData = {};
        if (request.request.httpVersion === 'chrome-extension') return;
        networkObject.method = request.request.method;
        networkObject.protocol = request.request.httpVersion;
        networkObject.size = request.response.bodySize;
        networkObject.status = request.response.status;
        networkObject.startTime = convertToEpoch(request.startedDateTime);
        networkObject.time = request.time;
        networkObject.urlEndpoint = request.request.url;
        // change this to resource type later on 
        networkObject.type = request.response.content.mimeType;
        networkObject.initiator = request._initiator;
        networkObject.timings = request.timings
        networkObject.originalRequest = request;
        chrome.runtime.sendMessage(networkObject);
      }
    )


} catch (error) {
  console.log(error);
}


