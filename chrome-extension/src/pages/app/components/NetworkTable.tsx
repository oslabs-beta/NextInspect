// import { useState } from 'react'
import { IMockData } from '../mockData';


interface NetworkTableProps {
  data: IMockData[];
}



const NetworkTable = ({data} : NetworkTableProps) => {

  // const [nameClick, setNameClick] = useState(false);

  function calcTime(sTime: number, eTime: number){
    return eTime - sTime;
  }

  return (
      <table>
        <tr>
          {/* <th className='flexible-header' onClick={()=> setNameClick(!nameClick)}> 
              Name {nameClick && 
              <div className='arrow'
              />}  */}
          <th>Trace ID</th>
          <th>Span ID</th>
          <th>Application Type</th>
          <th>Orig. Svc.</th>
          <th>Method</th>
          <th>Status</th>
          <th>Protocol</th>
          <th>Time</th>
          <th>Size</th>
          <th>Type</th>
          <th>Endpoint</th>
          
        </tr>
        {data.map((val, key) => {
          return(
            <tr key={key}>
              <td>{val.traceId}</td>
              <td>{val.spanId}</td>
              <td>{val.applicationType}</td>
              <td>{val.originatingService}</td>
              <td>{val.method}</td>
              <td>{val.status}</td>
              <td>{val.protocol}</td>
              <td>{calcTime(val.startTime, val.endTime)} ms</td>
              <td>{val.size}</td>
              <td>{val.type}</td>
              <td>{val.urlEndpoint}</td>
            </tr>
          )
        })}
    </table>    
  )
}

export default NetworkTable
