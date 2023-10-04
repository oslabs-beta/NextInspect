import { IDataEntry } from '../../../types/types'

interface TableRowProps {
  data: IDataEntry
}

const TableRow = ({ data }: TableRowProps) => {
  return (
    
    <tr className="even:bg-tableRow hover:bg-[#24245d]">
      <td className="td" colSpan={2}>{data.name}</td>
      <td className="td">{data.method}</td>
      <td className="td">{data.status}</td>
      <td className="td">{data.protocol}</td>
      <td className="td">{data.duration} ms</td>
      <td className="td">{data.rendering}</td>
    </tr>
  
  )
}

export default TableRow
