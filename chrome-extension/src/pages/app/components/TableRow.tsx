import { useState } from 'react'
import { IMockData } from '../mockData';
import { calcTotalTime } from '../functions/calcTotalTime';
import { ITotalTimes, getTraceTimeInfo } from '../functions/getTraceInfo';


interface TableRowProps {
  data: IMockData[];
}


const TableRow = ({data} : TableRowProps) => {

  const [rowClick, setRowClick] = useState(false);
  const multipleSpans = data.length > 1;
 
  const traceTimeInfo: ITotalTimes[] = getTraceTimeInfo(data)
  //console.log({data});
  return (
      <>
      <tr onClick={() => setRowClick(!rowClick)}>
          <td className={multipleSpans ? 'noPadding':'padding'}>
            {multipleSpans ? <div className={(rowClick && multipleSpans)? 'arrowDown':'arrow'}/> : null}
            
            {data[0].name}
          </td>
          <td>{data[0].traceId}</td>
          <td>{data[0].spanId}</td>
          <td>{data[0].applicationType}</td>
          <td>{data[0].originatingService}</td>
          <td>{data[0].method}</td>
          <td>{data[0].status}</td>
          <td>{data[0].protocol}</td>
          <td>{!rowClick? traceTimeInfo[0].duration: traceTimeInfo[1].duration} ms
          </td>
          {/* commented out data types for now for better UI during presentation */}
          {/* <td>{data[0].size ? data[0].size : 0}</td>
          <td>{data[0].type}</td>
          <td>{data[0].urlEndpoint}</td> */}
        </tr> 
        {multipleSpans && rowClick? (
          data.slice(1).map((val, key) => {
            return (
              <tr className="span" key={key}>
                <td></td>
                <td></td>
                <td>{val.spanId}</td>
                <td>{val.applicationType}</td>
                <td>{val.originatingService}</td>
                <td>{val.method}</td>
                <td>{val.status}</td>
                <td>{val.protocol}</td>
                <td>{calcTotalTime(val.startTime, val.endTime)} ms</td>
                {/* <td>{val.size ? val.size : 0} </td>
                <td>{val.type}</td>
                <td>{val.urlEndpoint}</td> */}
              </tr>
            )
          })
        ): null
        }       
      </>
        
  )
}

export default TableRow;
