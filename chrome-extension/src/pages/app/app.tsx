import { useEffect, useState } from 'react';
import './App.css'
import NetworkTable from './components/NetworkTable.tsx'
import WaterfallChart from './components/WaterfallGraph.tsx';
import checkTraceId from './functions/checkTraceId.ts'
import { OtelData, ITraceIdData} from '../../types/types.ts';

function App() {
  const [traceIdData, setTraceIdData] = useState<ITraceIdData>(new Map());

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      console.log('received chrome message', message)
    })
  }, []);
    

  useEffect(() => {
    const sseStream = new EventSource('http://localhost:3002/stream/sse');
    sseStream.addEventListener('message', (e) => {
      try {
        console.log(e.data);
        // setNetworkRequests(prevNetworkRequests => [...prevNetworkRequests, JSON.parse(e.data)]);
        setTraceIdData(prevTraceIdData => checkTraceId(prevTraceIdData, JSON.parse(e.data)))
      } catch (err) {
        console.log('failed', err);
      }
    });
  }, []);


  useEffect(() => {
    console.log(traceIdData);
  }, [traceIdData]);


 
  // const aggregatedData = checkTraceId(networkRequests);
  



  return (
    <>
      {/* <WaterfallChart data={aggregatedData}/> 
      <NetworkTable data={aggregatedData}/> */}
    </>
  )
}

export default App