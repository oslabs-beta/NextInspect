import { IAggregatedSortedData } from '../../../types/types';


interface TableRowProps {
  data: IAggregatedSortedData;
}

const TableRow = ({data} : TableRowProps) => {
  return (
    <tr>
      <td>{data.name}</td>
      <td>{data.method}</td>
      <td>{data.status}</td>
      <td>{data.protocol}</td>
      <td>{data.duration} ms</td>
      <td>{data.originatingService}</td>
      <td>{data.applicationType}</td>
    </tr>   
 )
}

export default TableRow;

