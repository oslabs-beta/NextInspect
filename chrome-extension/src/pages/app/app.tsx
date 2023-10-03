import { useEffect, useState } from 'react'
import './App.css'
import NetworkTable from './components/NetworkTable.tsx'
import WaterfallChart from './components/WaterfallGraph.tsx'
import { DataEntriesMap } from '../../types/types.ts'
import {
  aggregateAndSort,
  sortWithChromeData,
} from './functions/aggregateAndSort.ts'
import ClearState from './components/ClearState.tsx'
import Reload from './components/Reload.tsx'
import Legend from './components/legend.tsx'
import { setupChromeListener, setupSSEListener } from './functions/setUpListeners.ts'

function App() {
  const [dataEntriesMap, setDataEntriesMap] = useState<DataEntriesMap>(new Map())

  useEffect(() => {
    // Set up SSE and Chrome listeners
    const cleanupSSE = setupSSEListener(setDataEntriesMap, aggregateAndSort);
    const cleanupChrome = setupChromeListener(setDataEntriesMap, sortWithChromeData);

    // Clean up SSE and Chrome listeners on unmount
    return () => {
      cleanupSSE();
      cleanupChrome();
    };
  }, []);

  return (
    <div className="flex flex-col text-white font-medium">
      <div
        className={
          dataEntriesMap.size > 0
            ? 'h-[33vh]'
            : 'h-[33vh] border-b-[1px] border-slate-400'
        }
      >
        <WaterfallChart data={dataEntriesMap} />
      </div>

      {dataEntriesMap.size > 0 ? (
        <>
          <div className="flex justify-between">
            <Legend />
            <ClearState setRelevant={setDataEntriesMap} />
          </div>
          <NetworkTable data={dataEntriesMap} />
        </>
      ) : (
        <Reload />
      )}
    </div>
  )
}

export default App
