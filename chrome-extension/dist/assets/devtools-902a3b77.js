import"./modulepreload-polyfill-3cfb730f.js";function m(e){const n=new Date(e);return Math.round(n.getTime())}try{chrome.devtools.panels.create("NextInspect","icon.png","src/pages/panel/index.html"),chrome.devtools.network.onRequestFinished.addListener(function(e){if(e.request.httpVersion==="chrome-extension")return;const{httpVersion:n}=e.request,r=n.lastIndexOf("/"),a=n.slice(r+1),c=m(e.startedDateTime),i=Math.round(e.time),l=c+i,{url:t}=e.request,o=t.lastIndexOf("/");let s;const d=t.lastIndexOf("/",o-1);o===t.length-1?s=t.slice(d+1,o):s=t.slice(o+1);const h={type:e._resourceType,rendering:"Client",method:e.request.method,status:e.response.status,protocol:a,relativeStartTime:0,trueStartTime:c,trueEndTime:l,duration:i,name:s,size:e.response.bodySize};chrome.runtime.sendMessage(h)})}catch(e){console.log(e)}
