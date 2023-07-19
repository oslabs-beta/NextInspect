import { useEffect, useState } from 'react';
import './App.css'
import NetworkTable from './components/NetworkTable.tsx'
import WaterfallChart from './components/WaterfallGraph.tsx';
import {IChromeApiData, IRelevantData, ITraceIdMap} from '../../types/types.ts';
import {aggregateAndSort, sortWithChromeDataType} from './functions/aggregateAndSort.ts';
import ClearState from './components/ClearState.tsx';
import Reload from './components/Reload.tsx';
import { checkTraceId } from './devFunctions/checkTraceId.ts';
import convertChromeDataType from './functions/convertChromeDataType.ts';

function App() {
  const [relevantData, setRelevantData] = useState<IRelevantData>(new Map()); 

  const [traceIdMap, setTraceIdMap] = useState<ITraceIdMap>(new Map());

  const [chromeData, setChromeData] = useState<IChromeApiData[]>([]);
  
  useEffect(() => {
    const sseStream = new EventSource('http://localhost:3002/stream/sse');
    sseStream.addEventListener('message', (e) => {
      try {
        aggregateAndSort(setRelevantData, JSON.parse(e.data));
        checkTraceId(setTraceIdMap, JSON.parse(e.data));
      } catch (err) {
        console.log('failed', err);
      }
    });
  }, []);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      // console.log('received chrome message', message);

      // checking data - crossreferencing with chrome's api
      setChromeData(prevChromeData => {
        const newChromeData = [...prevChromeData];
        newChromeData.push(message);
        return newChromeData;
      })

      if(message.type === "text/html"){
        console.log('ChromeApiDocument', message);
        const updatedChromeDataType = convertChromeDataType(message);
        sortWithChromeDataType(setRelevantData, updatedChromeDataType)
      }
    })
  }, []);

  // dev purposes: 
  useEffect(() => {
    console.log('sortedOtelDataByTraceId', traceIdMap);
  }, [traceIdMap]);

  useEffect(() => {
    console.log('incomingChromeData', chromeData);
  }, [chromeData]);


  return (
    <div className='flex flex-col'>
      <div className={relevantData.size > 0 ? 'h-[33vh]' : 'h-[33vh] border-b-[1px] border-slate-400'}>
        <WaterfallChart data={relevantData}/> 
      </div>

      {relevantData.size > 0 ?
        <div>
          {/* <ClearState setRelevant={setRelevantData}  /> */}
          <ClearState setRelevantData={setRelevantData}  setTraceIdMap={setTraceIdMap} setChromeData={setChromeData}/>
          <NetworkTable data={relevantData}/>
        </div>
        :
        <Reload/>
      }
    </div>
  )
}

export default App