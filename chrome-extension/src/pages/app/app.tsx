import { useEffect, useState } from 'react';
import './App.css'
import NetworkTable from './components/NetworkTable.tsx'
import WaterfallChart from './components/WaterfallGraph.tsx';
import {IRelevant} from '../../types/types.ts';
import {isRelevant} from './functions/isRelevant.ts';
import ClearState from './components/ClearState.tsx';
import Reload from './components/Reload.tsx';

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
    <div className='flex flex-col'>
      <div className={relevant.size > 0 ? 'h-[33vh]' : 'h-[33vh] border-b-[1px] border-slate-400'}>
        <WaterfallChart data={relevant}/> 
      </div>

      {relevant.size > 0 ?
        <div>
          <ClearState setRelevant={setRelevant} />
          <NetworkTable data={relevant}/>
        </div>
        :
        <Reload/>
      }
    </div>
  )
}

export default App