// import React from 'react'

// export default function App() {
//   return (
//     <>
//       <p>App connected</p>
//     </>
//   )
// }

import './App.css'
import NetworkTable from './components/NetworkTable.tsx'
import {mockData} from './mockData.tsx'

function App() {

  return (
    <>
      <h1>NextInspect DevTool</h1>
      <NetworkTable data={mockData}/>
      
    </>
  )
}

export default App