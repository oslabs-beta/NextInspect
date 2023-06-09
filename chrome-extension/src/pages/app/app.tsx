import { useState } from 'react';
import './App.css'
import NetworkTable from './components/NetworkTable.tsx'
import { OtelData } from '../../types/types.ts';

function App() {
    // would like to refactor so that requests that have already been rendered, do not need to be rendered again
  const [networkRequests, setNetworkRequests] = useState<OtelData[]>([]);


  const sseStream = new EventSource('http://localhost:3002/stream/sse');
  sseStream.onmessage = (e) => {
    const data:OtelData = e.data;
    setNetworkRequests([...networkRequests, data])
  }

  



  return (
    <>
    
      <h1>NextInspect DevTool</h1>
      <NetworkTable data={networkRequests}/>
      
    </>
  )
}

export default App