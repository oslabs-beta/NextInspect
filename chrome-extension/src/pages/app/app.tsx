import { useEffect, useState } from 'react';
import './App.css'
import NetworkTable from './components/NetworkTable.tsx'
import WaterfallChart from './components/WaterfallGraph.tsx';
import checkTraceId from './functions/checkTraceId.ts'
import { OtelData } from '../../types/types.ts';

function App() {

  // const [networkRequests, setNetworkRequests] = useState<IMockData[]>([]);
  const [networkRequests, setNetworkRequests] = useState<OtelData[]>([]);
  let count: number = 0;

  useEffect(() => {
    const sseStream = new EventSource('http://localhost:3002/stream/sse');
    sseStream.addEventListener('message', (e) => {
      try {
        count += 1;
        console.log(e.data);
        setNetworkRequests(prevNetworkRequests => [...prevNetworkRequests, JSON.parse(e.data)]);
      } catch (err) {
        console.log('failed', err);
      }
    });
  }, []);


  useEffect(() => {
    console.log(networkRequests);
  }, [networkRequests]);
 
  const aggregatedData = checkTraceId(networkRequests);



  return (
    <>
      <WaterfallChart data={aggregatedData}/> 
      <NetworkTable data={aggregatedData}/>
    </>
  )
}

export default App