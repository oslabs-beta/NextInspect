import { useState } from 'react';
import './App.css'
import NetworkTable from './components/NetworkTable.tsx'
import WaterfallChart from './components/WaterfallGraph.tsx';
// import {updatedMockData, IMockData} from './mockData.tsx'
// import {updatedMockData } from './mockData.tsx'
import checkTraceId from './functions/checkTraceId.ts'
import { OtelData } from '../../types/types.ts';
// import * as pako from 'pako';

function App() {

  // const [networkRequests, setNetworkRequests] = useState<IMockData[]>([]);
  const [networkRequests, setNetworkRequests] = useState<OtelData[]>([]);


  const sseStream = new EventSource('http://localhost:3002/stream/sse');
  sseStream.addEventListener('message', (e)=> {
    try {
      setNetworkRequests([...networkRequests, JSON.parse(e.data)])
    } catch (err) {
      console.log('failed', err)
    }
  })
  // sseStream.onmessage = (e) => {
  //   try {
  //     console.log(JSON.parse(e.data));
  //     // const base64Data = e.data.split('data: ')[1];
  //     // const compressedData = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
  //     // const uncompressedData = pako.ungzip(compressedData);
  //     // const jsonString = new TextDecoder().decode(uncompressedData);
  //     // const data = JSON.parse(e.data)
  //     // const data = JSON.parse(jsonString);
  //     // console.log('hello')
  //     // setNetworkRequests([...networkRequests, data]);
  //   } catch (err) {
  //     console.log('failed', err)
  //   }
  // }

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