import { SetDataEntriesMap  } from '../../../types/types'
import { aggregateAndSort} from './aggregateAndSort'
import { shouldIncludeOtelData } from './datatUtils';


export function setupSSEListener(setDataEntriesMap :SetDataEntriesMap) {
  const sseStream = new EventSource('http://localhost:3002/stream/sse');

  const handleSSEMessage = (e:any) => {
    try {
      const incomingData = JSON.parse(e.data);
      if(!shouldIncludeOtelData(incomingData)) return;
      aggregateAndSort(setDataEntriesMap , incomingData, 'openTelemetry');
    } catch (err) {
      console.log('failed', err);
    }
  };

  sseStream.addEventListener('message', handleSSEMessage);

  // Return a cleanup function for SSE streaming
  return () => {
    sseStream.removeEventListener('message', handleSSEMessage);
    sseStream.close();
  };
}

export function setupChromeListener(SetDataEntriesMap :SetDataEntriesMap) {
  const handleChromeRuntimeMessage = (message:any) => {
    if (!(message.type === 'websocket' && message.name === 'webpack-hmr')) {
      // sortWithChromeData(SetDataEntriesMap , message);
      aggregateAndSort(SetDataEntriesMap, message, 'chrome');
    }
  };

  chrome.runtime.onMessage.addListener(handleChromeRuntimeMessage);

  // Return a cleanup function for Chrome runtime message listener
  return () => {
    chrome.runtime.onMessage.removeListener(handleChromeRuntimeMessage);
  };
}