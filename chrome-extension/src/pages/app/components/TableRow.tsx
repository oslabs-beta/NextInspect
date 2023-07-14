import { IAggregatedSortedData } from '../../../types/types'

interface TableRowProps {
  data: IAggregatedSortedData
}

const TableRow = ({ data }: TableRowProps) => {
  return (
    <>
      <tr className="even:bg-tableRow hover:bg-[#24245d]">
        <td className="td">{data.name}</td>
        <td className="td">{data.method}</td>
        <td className="td">{data.status}</td>
        <td className="td">{data.protocol}</td>
        <td className="td">{data.duration} ms</td>
        <td className="td">{data.originatingService}</td>
        <td className="td">{data.applicationType}</td>
      </tr>
    </>
  )
}

export default TableRow
