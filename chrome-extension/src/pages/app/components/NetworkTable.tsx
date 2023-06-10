// import { useState } from 'react'
import TableRow from './TableRow';
import { IMockData } from '../mockData';




interface NetworkTableProps {
  data: IMockData[][];
}

const NetworkTable = ({data} : NetworkTableProps) => {
  
  return (
      <table>
        <tr>
          <th>Name</th>
          <th>Trace ID</th>
          <th>Span ID</th>
          <th>Application Type</th>
          <th>Orig. Svc.</th>
          <th>Method</th>
          <th>Status</th>
          <th>Protocol</th>
          <th>Time</th>
          {/* <th>Size</th>
          <th>Type</th>
          <th>Endpoint</th> */}
        </tr>
        {data.map((val, index) => {
            return(
              <TableRow data={val} key={index}/>
            )
        })}
    </table>    
  )
}


export default NetworkTable
