
import TableRow from './TableRow';
import { IRelevant } from '../../../types/types';

interface NetworkTableProps {
  data: IRelevant;
}

const NetworkTable = ({data} : NetworkTableProps) => {
  return (
      <table>
        
        <tr>
          <th>Name</th>
          <th>Method</th>
          <th>Status</th>
          <th>Protocol</th>
          <th>Time</th>
          <th>Orig. Svc.</th>
          <th>Application Type</th>
      
        </tr>
        
      {Array.from(data).map(([key, request]) => (
        <TableRow key={key} data={request} />
      ))}
    </table>    
  )
}


export default NetworkTable
