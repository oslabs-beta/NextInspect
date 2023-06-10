// import { useState } from 'react'
import TableRow from './TableRow';
// import { IMockData } from '../mockData';
import { OtelData } from '../../../types/types';




interface NetworkTableProps {
  // data: IMockData[][];
  data: OtelData[][]
}

const NetworkTable = ({data} : NetworkTableProps) => {
  
  return (
      <table>
        <tr>
          <th>Trace ID</th>
          <th>Name</th>
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
