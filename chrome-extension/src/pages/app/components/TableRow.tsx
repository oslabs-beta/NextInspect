import { useState } from 'react'
// import { IMockData } from '../mockData';
import { calcTotalTime } from '../functions/calcTotalTime'
import { ITotalTimes, getTraceTimeInfo } from '../functions/getTraceInfo'
import { OtelData } from '../../../types/types'

interface TableRowProps {
  data: OtelData[]
}

const TableRow = ({ data }: TableRowProps) => {
  const [rowClick, setRowClick] = useState(false)
  const multipleSpans = data.length > 1

  const traceTimeInfo: ITotalTimes[] = getTraceTimeInfo(data)
  //console.log({data});
  return (
    <>
      <tr
        className="even:bg-tableRow hover:bg-[#24245d]"
        onClick={() => setRowClick(!rowClick)}
      >
        <td className={multipleSpans ? 'noPadding' : 'padding'}>
          {multipleSpans ? (
            <div
              className={rowClick && multipleSpans ? 'arrowDown' : 'arrow'}
            />
          ) : null}
          {data[0].traceId}
        </td>
        <td className="td">{data[0].name}</td>
        <td className="td">{data[0].spanId}</td>
        <td className="td">{data[0].applicationType}</td>
        <td className="td">{data[0].originatingService}</td>
        <td className="td">{data[0].method}</td>
        <td className="td">{data[0].status}</td>
        <td className="td">{data[0].protocol}</td>
        <td className="td">
          {!rowClick
            ? traceTimeInfo[0].duration
            : calcTotalTime(data[0].startTime, data[0].endTime)}{' '}
          ms
        </td>
        {/* commented out data types for now for better UI during presentation */}
        {/* <td>{data[0].size ? data[0].size : 0}</td>
          <td>{data[0].type}</td>
          <td>{data[0].urlEndpoint}</td> */}
      </tr>
      {multipleSpans && rowClick
        ? data.slice(1).map((val, key) => {
            return (
              <tr className="span" key={key}>
                <td className="td"></td>
                <td className="td">{val.name}</td>
                <td className="td">{val.spanId}</td>
                <td className="td">{val.applicationType}</td>
                <td className="td">{val.originatingService}</td>
                <td className="td">{val.method}</td>
                <td className="td">{val.status}</td>
                <td className="td">{val.protocol}</td>
                <td className="td">
                  {calcTotalTime(val.startTime, val.endTime)} ms
                </td>
                {/* <td>{val.size ? val.size : 0} </td>
                <td>{val.type}</td>
                <td>{val.urlEndpoint}</td> */}
              </tr>
            )
          })
        : null}
    </>
  )
}

export default TableRow
