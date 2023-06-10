import { useState } from 'react'
// import { IMockData } from '../mockData';
import { OtelData } from '../../../types/types';


interface TableRowProps {
  data: OtelData[];
}


const TableRow = ({data} : TableRowProps) => {

  const [rowClick, setRowClick] = useState(false);
  const multipleSpans = data.length > 1; // check if there are multipleSpans that share a traceId

  function calcTime(sTime: number, eTime: number): number{
    return eTime - sTime;
  }

  // console.log({data});
  return (
      <>
      <tr onClick={() => setRowClick(!rowClick)}>
          <td>
            {multipleSpans ? <div className={(rowClick && multipleSpans)? 'arrowDown':'arrow'}/> : null}
            
            {data[0].traceId}
          </td>
          <td>{data[0].spanId}</td>
          <td>{data[0].applicationType}</td>
          <td>{data[0].originatingService}</td>
          <td>{data[0].method}</td>
          <td>{data[0].status}</td>
          <td>{data[0].protocol}</td>
          <td>{calcTime(data[0].startTime, data[0].endTime)} ms</td>
          <td>{data[0].size}</td>
          <td>{data[0].type}</td>
          <td>{data[0].urlEndpoint}</td>
        </tr> 
        {multipleSpans && rowClick? (  
          data.slice(1).map((val, key) => {
            return (
              <tr className="span" key={key}>
                <td></td>
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
          })
        ): null
        }       
      </>
        
  )
}

export default TableRow;
