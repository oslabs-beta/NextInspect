import TableRow from './TableRow'
import { RelevantData } from '../../../types/types'

interface NetworkTableProps {
  data: RelevantData
}

const NetworkTable = ({ data }: NetworkTableProps) => {
  return (
    <table className="w-full border border-blue-700 border-1 border-collapse">
      <tr>
        <th className="th td">Name</th>
        <th className="th td">Method</th>
        <th className="th td">Status</th>
        <th className="th td">Protocol</th>
        <th className="th td">Time</th>
        <th className="th td">Rendering</th>
      </tr>

      {Array.from(data).map(([key, request]) => (
        !request.clientSideOtelData ? (
          <TableRow key={key} data={request} />
        ) : null
      ))}
    </table>
  )
}

export default NetworkTable
