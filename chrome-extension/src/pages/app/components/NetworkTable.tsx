// import { useState } from 'react'
import TableRow from './TableRow';
// import { IMockData } from '../mockData';
import { IRelevantData } from '../../../types/types';




// interface NetworkTableProps {
//   data: IRelevantData;
// }
interface NetworkTableProps {
  data: IRelevantData;
}


const NetworkTable = ({data} : NetworkTableProps) => {
  // console.log(`networkTableData: ${data}`);
 
  return (
      <table>
        
        <tr>
          {/* <th>Trace ID</th> */}
          <th>Name</th>
          <th>Method</th>
          <th>Status</th>
          <th>Protocol</th>
          <th>Time</th>
          <th>Orig. Svc.</th>
          <th>Application Type</th>
          {/* <th>Span ID</th> */}
          
          
          
          
          
          
          {/* <th>Size</th>
          <th>Type</th>
          <th>Endpoint</th> */}
        </tr>
        {data.map((val, index) => {
            return(
              <TableRow data={val} key={index}/>
            )
        })}
         {/* {Object.entries(data).map(([key, val], index) => {
            // console.log(`object.entries.map: ${key}, ${val}`)
            return(<TableRow data={val} key={index} />)
          })}; */}
    </table>    
  )
}


export default NetworkTable
