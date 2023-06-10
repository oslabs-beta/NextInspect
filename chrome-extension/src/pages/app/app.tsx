import { useState } from 'react';
import './App.css'
import NetworkTable from './components/NetworkTable.tsx'
import WaterfallChart from './components/WaterfallGraph.tsx';
import {updatedMockData, IMockData} from './mockData.tsx'
import checkTraceId from './functions/checkTraceId.ts'

function App() {

  const [networkRequests, setNetworkRequests] = useState<IMockData[]>([]);


  const sseStream = new EventSource('http://localhost:3002/stream/sse');
  sseStream.onmessage = (e) => {
    const data:OtelData = e.data;
    setNetworkRequests([...networkRequests, data])
  }

  const aggregatedData = checkTraceId(updatedMockData);



  return (
    <>
      <WaterfallChart data={aggregatedData}/> 
      <NetworkTable data={aggregatedData}/>
    </>
  )
}

export default App