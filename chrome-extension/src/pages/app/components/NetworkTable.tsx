import { useState } from 'react'
import { IMockData } from '../mockData';


interface NetworkTableProps {
  data: IMockData[];
}



const NetworkTable = ({data} : NetworkTableProps) => {

  const [nameClick, setNameClick] = useState(false)
  return (
      <table>
        <tr>
          <th className='flexible-header' onClick={()=> setNameClick(!nameClick)}> 
              Name {nameClick && 
              <div className='arrow'
              />} 
          </th>
          <th>Url</th>
          <th>Method</th>
          <th>Status</th>
          <th>Protocol</th>
          <th>Type</th>
          <th>Size</th>
          <th>Time</th>
        </tr>
        {data.map((val, key) => {
          return(
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.url}</td>
              <td>{val.method}</td>
              <td>{val.status}</td>
              <td>{val.protocol}</td>
              <td>{val.type}</td>
              <td>{val.size}</td>
              <td>{val.time}</td>
            </tr>
          )
        })}
    </table>    
  )
}

export default NetworkTable
