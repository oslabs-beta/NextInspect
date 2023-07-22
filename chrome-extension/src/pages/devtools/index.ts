import { IAggregatedSortedData} from "../../types/types";
import convertToEpoch from "../app/functions/convertToEpoch";

try {
  chrome.devtools.panels.create(
    'NextInspect',
    'icon.png',
    'src/pages/panel/index.html'
  );

  chrome.devtools.network.onRequestFinished.addListener(
    function(request) {
      if (request.request.httpVersion === 'chrome-extension') return;

   
      const {httpVersion} = request.request
      const httpVersionlastIndexSlash = httpVersion.lastIndexOf("/");
      const protocol = httpVersion.slice(httpVersionlastIndexSlash + 1)

      const trueStartTime = convertToEpoch(request.startedDateTime);
      const duration = Math.round(request.time)
      const trueEndTime = trueStartTime + duration;

      const {url} = request.request
      const urlLastIndexSlash = url.lastIndexOf("/");
      let name: string;
      const urlSecondLastIndexSlash = url.lastIndexOf("/", urlLastIndexSlash - 1);
    
      if(urlLastIndexSlash === (url.length -1)){
        name = url.slice(urlSecondLastIndexSlash + 1, urlLastIndexSlash)
      }else{
        name = url.slice(urlLastIndexSlash + 1);
      }

      const networkObject: IAggregatedSortedData = {
        type: request._resourceType as string,
        rendering: "Client",
        method: request.request.method,
        status: request.response.status,
        protocol: protocol, 
        relativeStartTime: 0,
        trueStartTime,
        trueEndTime,
        duration,
        name,
        clientSideOtelData: false
      };

      chrome.runtime.sendMessage(networkObject);

    }
  )


} catch (error) {
  console.log(error);
}


