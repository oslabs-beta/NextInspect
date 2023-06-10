// import { useState } from 'react'
import TableRow from './TableRow';
import { OtelData } from "../../../types/types";


interface NetworkTableProps {
  data: OtelData[];
}

const NetworkTable = ({data} : NetworkTableProps) => {
  let singleTrace = ''; // storing current traceId 
  let newTrace = false; // boolean that checks if singleTrace has just been updated
  let singleTraceData: OtelData[] = []; // storing all spanId objects that share one traceId

  return (
      <table>
        <tr>
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
        {data.map((val, index) => {
          if(newTrace === true){
            singleTraceData = [];
            newTrace = false;
          }
          singleTraceData.push(val);
          // if current elem is last elem
          if(!data[index+1]){
            return(
              <TableRow data={singleTraceData} key={val.spanId}/>
            )
          }else if(data[index + 1].traceId !== singleTrace){
            singleTrace = data[index + 1].traceId;
            newTrace = true;
            // console.log(singleTraceData)
            return(
              <TableRow data={singleTraceData} key={val.spanId}/>
            )
          }
        })}
    </table>    
  )
}

export default NetworkTable
