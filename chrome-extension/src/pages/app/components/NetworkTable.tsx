// import { useState } from 'react'
import TableRow from './TableRow'
// import { IMockData } from '../mockData';
import { OtelData } from '../../../types/types'

interface NetworkTableProps {
  // data: IMockData[][];
  data: OtelData[][]
}

const NetworkTable = ({ data }: NetworkTableProps) => {
  return (
    <table className="border border-blue-700 border-collapse">
      <tr>
        <th className="th td">Trace ID</th>
        <th className="th td">Name</th>
        <th className="th td">Span ID</th>
        <th className="th td">Application Type</th>
        <th className="th td">Orig. Svc.</th>
        <th className="th td">Method</th>
        <th className="th td">Status</th>
        <th className="th td">Protocol</th>
        <th className="th td">Time</th>
        {/* <th>Size</th>
          <th>Type</th>
          <th>Endpoint</th> */}
      </tr>
      {data.map((val, index) => {
        return <TableRow data={val} key={index} />
      })}
    </table>
  )
}

export default NetworkTable
