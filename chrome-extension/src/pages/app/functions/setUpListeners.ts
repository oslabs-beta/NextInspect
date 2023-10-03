import { SetDataEntriesMap  } from '../../../types/types'
import { aggregateAndSort, sortWithChromeData } from './aggregateAndSort'


export function setupSSEListener(setDataEntriesMap :SetDataEntriesMap , aggregateAndSort:Function) {
  const sseStream = new EventSource('http://localhost:3002/stream/sse');

  const handleSSEMessage = (e:any) => {
    try {
      aggregateAndSort(setDataEntriesMap , JSON.parse(e.data));
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

export function setupChromeListener(SetDataEntriesMap :SetDataEntriesMap , sortWithChromeData:Function) {
  const handleChromeRuntimeMessage = (message:any) => {
    if (!(message.type === 'websocket' && message.name === 'webpack-hmr')) {
      sortWithChromeData(SetDataEntriesMap , message);
    }
  };

  chrome.runtime.onMessage.addListener(handleChromeRuntimeMessage);

  // Return a cleanup function for Chrome runtime message listener
  return () => {
    chrome.runtime.onMessage.removeListener(handleChromeRuntimeMessage);
  };
}