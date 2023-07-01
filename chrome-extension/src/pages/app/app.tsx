import { useEffect, useState } from 'react';
import './App.css'
import NetworkTable from './components/NetworkTable.tsx'
import WaterfallChart from './components/WaterfallGraph.tsx';
import checkTraceId from './functions/checkTraceId.ts'
import { OtelData, IAggregatedData} from '../../types/types.ts';

function App() {
  // const [traceIdData, setTraceIdData] = useState<ITraceIdData>(new Map());
  const [aggregatedData, setAggregatedData] = useState<IAggregatedData>(new Map());

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      setAggregatedData(prevAggregatedData => prevAggregatedData.set(`chromeApiRequestData: ${message.type}, startTime ${message.startTime}`, message))
      
    })
  }, []);
    

  useEffect(() => {
    const sseStream = new EventSource('http://localhost:3002/stream/sse');
    sseStream.addEventListener('message', (e) => {
      try {
        console.log(e.data);
        // setNetworkRequests(prevNetworkRequests => [...prevNetworkRequests, JSON.parse(e.data)]);
        setAggregatedData(prevAggregatedData => checkTraceId(prevAggregatedData, JSON.parse(e.data)))
      } catch (err) {
        console.log('failed', err);
      }
    });
  }, []);


  useEffect(() => {
    console.log(aggregatedData);
  }, [aggregatedData]);

  return (
    <>
      {/* <WaterfallChart data={aggregatedData}/> 
      <NetworkTable data={aggregatedData}/> */}
    </>
  )
}

export default App