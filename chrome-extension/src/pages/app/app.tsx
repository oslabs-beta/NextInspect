import { useEffect, useState } from 'react'
import './App.css'
import NetworkTable from './components/NetworkTable.tsx'
import WaterfallChart from './components/WaterfallGraph.tsx'
import { RelevantData } from '../../types/types.ts'
import {
  aggregateAndSort,
  sortWithChromeData,
} from './functions/aggregateAndSort.ts'
import ClearState from './components/ClearState.tsx'
import Reload from './components/Reload.tsx'
import Legend from './components/legend.tsx'

function App() {
  const [relevantData, setRelevantData] = useState<RelevantData>(new Map())

  useEffect(() => {
    const sseStream = new EventSource('http://localhost:3002/stream/sse')
    sseStream.addEventListener('message', (e) => {
      try {
        aggregateAndSort(setRelevantData, JSON.parse(e.data))
      } catch (err) {
        console.log('failed', err)
      }
    })
  }, [])

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      if (!(message.type === 'websocket' && message.name === 'webpack-hmr')) {
        sortWithChromeData(setRelevantData, message)
      }
    })
  }, [])

  return (
    <div className="flex flex-col">
      <div
        className={
          relevantData.size > 0
            ? 'h-[33vh]'
            : 'h-[33vh] border-b-[1px] border-slate-400'
        }
      >
        <WaterfallChart data={relevantData} />
      </div>

      {relevantData.size > 0 ? (
        <>
          <div className="flex justify-end items-center">
            <Legend />
            <ClearState setRelevant={setRelevantData} />
          </div>
          <NetworkTable data={relevantData} />
        </>
      ) : (
        <Reload />
      )}
    </div>
  )
}

export default App
