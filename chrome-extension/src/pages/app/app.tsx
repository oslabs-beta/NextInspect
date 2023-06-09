import { useState } from 'react';
import './App.css'
import NetworkTable from './components/NetworkTable.tsx'
import {mockData, IMockData} from './mockData.tsx'

function App() {
  // would like to refactor so that requests that have already been rendered, do not need to be rendered again
  const [networkRequests, setNetworkRequests] = useState<IMockData[]>([]);


  const eventSource = new EventSource('http://localhost:3002/stream/sse');
  eventSource.onmessage = (e) => {
    const data:IMockData = e.data;
    setNetworkRequests([...networkRequests, data])
    console.log(e.data)
  }

  



  return (
    <>
    
      <h1>NextInspect DevTool</h1>
      <NetworkTable data={mockData}/>
      
    </>
  )
}

export default App