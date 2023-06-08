import './App.css'
import NetworkTable from './components/NetworkTable.tsx'
import {mockData} from './mockData.tsx'

function App() {
  const eventSource = new EventSource('http://localhost:3002/stream/sse');
  eventSource.onmessage = (e) => {
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