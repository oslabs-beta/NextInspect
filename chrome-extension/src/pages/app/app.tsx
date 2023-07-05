import { useEffect, useState } from 'react';
import './App.css'
import NetworkTable from './components/NetworkTable.tsx'
import WaterfallChart from './components/WaterfallGraph.tsx';
import checkTraceId from './functions/checkTraceId.ts'
import { OtelData, IAggregatedData, IRelevantData} from '../../types/types.ts';
import isRelevantData from './functions/isRelevantData.ts';

function App() {
  // const [traceIdData, setTraceIdData] = useState<ITraceIdData>(new Map());
  // const [aggregatedData, setAggregatedData] = useState<IAggregatedData>(new Map());
  // const [relevantData, setRelevantData] = useState<IRelevantData>(new Map());
  const [relevantData, setRelevantData] = useState<IRelevantData>([]);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      // setAggregatedData(prevAggregatedData => prevAggregatedData.set(`chromeApiRequestData: ${message.type}, startTime ${message.startTime}`, message))
      console.log(`chromeApiRequestData: ${message.type}, startTime ${message.startTime}`, message);
    })
  }, []);
    

  useEffect(() => {
    const sseStream = new EventSource('http://localhost:3002/stream/sse');
    sseStream.addEventListener('message', (e) => {
      try {
        console.log(e.data);
        // setNetworkRequests(prevNetworkRequests => [...prevNetworkRequests, JSON.parse(e.data)]);
        // setAggregatedData(prevAggregatedData => checkTraceId(prevAggregatedData, JSON.parse(e.data)))
        isRelevantData(setRelevantData, JSON.parse(e.data))
        // setRelevantData(prevRelevantData => isRelevantData(prevRelevantData, JSON.parse(e.data)));
      } catch (err) {
        console.log('failed', err);
      }
    });
  }, []);


  // useEffect(() => {
  //   console.log(aggregatedData);
  // }, [aggregatedData]);

  useEffect(() => {
    console.log(relevantData);
  }, [relevantData]);

  return (
    <>
      <WaterfallChart data={relevantData}/> 
      <NetworkTable data={relevantData}/>
    </>
  )
}

export default App