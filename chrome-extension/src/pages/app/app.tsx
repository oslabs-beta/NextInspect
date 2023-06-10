import { useState } from 'react';
import './App.css'
import NetworkTable from './components/NetworkTable.tsx'
import WaterfallChart from './components/WaterfallGraph.tsx';
// import {updatedMockData, IMockData} from './mockData.tsx'
// import {updatedMockData } from './mockData.tsx'
import checkTraceId from './functions/checkTraceId.ts'
import { OtelData } from '../../types/types.ts';

function App() {

  // const [networkRequests, setNetworkRequests] = useState<IMockData[]>([]);
  const [networkRequests, setNetworkRequests] = useState<OtelData[]>([]);


  const sseStream = new EventSource('http://localhost:3002/stream/sse');
  sseStream.addEventListener('m')
  sseStream.onmessage = (e) => {
    try {
      console.log(e.data);
      const data:OtelData = e.data;
      setNetworkRequests([...networkRequests, data]);
    } catch (err) {
      console.log('failed', err)
    }

  }

  // const aggregatedData = checkTraceId(updatedMockData);
  const aggregatedData = checkTraceId(networkRequests);



  return (
    <>
      <WaterfallChart data={aggregatedData}/> 
      <NetworkTable data={aggregatedData}/>
    </>
  )
}

export default App