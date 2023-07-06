import { useEffect, useState } from 'react';
import './App.css'
import NetworkTable from './components/NetworkTable.tsx'
import WaterfallChart from './components/WaterfallGraph.tsx';
import {IRelevant} from '../../types/types.ts';
import {isRelevant} from './functions/isRelevant.ts';

function App() {
  const [relevant, setRelevant] = useState<IRelevant>(new Map()); 


  // testing uses only: to cross-reference incoming client data with otel data
  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      // console.log(`chromeApiRequestData: ${message.type}, startTime ${message.startTime}`, message);
    })
  }, []);
    

  useEffect(() => {
    const sseStream = new EventSource('http://localhost:3002/stream/sse');
    sseStream.addEventListener('message', (e) => {
      try {
        isRelevant(setRelevant, JSON.parse(e.data));
      } catch (err) {
        console.log('failed', err);
      }
    });
  }, []);


  useEffect(() => {
    console.log(relevant);
  }, [relevant]); 


  return (
    <>
      <WaterfallChart data={relevant}/> 
      <NetworkTable data={relevant}/>
    </>
  )
}

export default App