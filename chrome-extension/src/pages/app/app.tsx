import './App.css'
import NetworkTable from './components/NetworkTable.tsx'
import { OtelData } from '../../types/types.ts';

function App() {
  const sseStream = new EventSource('http://localhost:3002/stream/sse');
  const ssrData: OtelData[] = [];
  sseStream.onmessage = (e) => {
    ssrData.push(e.data)
  }
  
  return (
    <>
      <h1>NextInspect DevTool</h1>
      <NetworkTable data={ssrData}/>
      
    </>
  )
}

export default App