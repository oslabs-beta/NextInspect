import TableRow from './TableRow'
import { DataEntriesMap } from '../../../types/types'

interface NetworkTableProps {
  data: DataEntriesMap
}

const NetworkTable = ({ data }: NetworkTableProps) => {
  return (
      <table className="w-full border-collapse border-2 border-blue-800">
        <tr>
          <th className="th" colSpan={2}>Name</th>
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
