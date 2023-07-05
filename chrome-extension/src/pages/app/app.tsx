import { useEffect, useState } from 'react';
import './App.css'
import NetworkTable from './components/NetworkTable.tsx'
import WaterfallChart from './components/WaterfallGraph.tsx';
import checkTraceId from './functions/checkTraceId.ts'
import { OtelData, IAggregatedData, IRelevantData, IRelevant, ISortedData} from '../../types/types.ts';
import {isRelevantData, isRelevant} from './functions/isRelevantData.ts';
import  sortData  from './functions/sortData.ts';

function App() {
  // const [traceIdData, setTraceIdData] = useState<ITraceIdData>(new Map());
  // const [aggregatedData, setAggregatedData] = useState<IAggregatedData>(new Map());
  // const [relevantData, setRelevantData] = useState<IRelevantData>(new Map());
  const [relevantData, setRelevantData] = useState<IRelevantData>([]); // renders but not the refactored logic

  const [relevant, setRelevant] = useState<IRelevant>(new Map()); // doesn't render but is the refactored logic

  const [mostRecentEntry, setMostRecentEntry] = useState<string>(""); // mainly just to figure out what name  === / belongs to

  const [sortedData, setSortedData] = useState<ISortedData>([]);

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
        // console.log(e.data);
        // setNetworkRequests(prevNetworkRequests => [...prevNetworkRequests, JSON.parse(e.data)]);
        // setAggregatedData(prevAggregatedData => checkTraceId(prevAggregatedData, JSON.parse(e.data)))
        isRelevantData(setRelevantData, JSON.parse(e.data), )
        isRelevant(setRelevant, mostRecentEntry, setMostRecentEntry, JSON.parse(e.data));
        // setRelevantData(prevRelevantData => isRelevantData(prevRelevantData, JSON.parse(e.data)));
      } catch (err) {
        console.log('failed', err);
      }
    });
  }, []);


  // useEffect(() => {
  //   console.log(aggregatedData);
  // }, [aggregatedData]);

  // useEffect(() => {
  //   console.log(relevantData);
  // }, [relevantData]);

  useEffect(() => {
    console.log(relevant);
    setSortedData(sortData(relevant));
    
  }, [relevant]); 

  useEffect(() => {
    console.log(sortedData);
  }, [sortedData]);

  return (
    <>
      <WaterfallChart data={relevantData}/> 
      <NetworkTable data={relevantData}/>
    </>
  )
}

export default App