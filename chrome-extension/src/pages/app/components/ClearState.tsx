import { ISetChromeApiData, ISetRelevantData, ISetTraceIdMap } from "../../../types/types";

interface ClearStateProps {
  setRelevantData: ISetRelevantData;
  setTraceIdMap: ISetTraceIdMap,
  setChromeData: ISetChromeApiData
}

// const ClearState = ({setRelevant} : ClearStateProps) => {
//   const clearState = () => {
//     setRelevant(new Map());
//   }
//   return (
//     <button className="bg-violet-800 border-[1px] border-slate-400 mb-5 p-2 ml-auto" onClick = {clearState}>
//       Clear History
//     </button>
//   )
// }
const ClearState = ({setRelevantData, setTraceIdMap, setChromeData} : ClearStateProps) => {
  const clearState = () => {
    setRelevantData(new Map());
    setTraceIdMap(new Map());
    setChromeData([]);
  }
  return (
    <button className="bg-violet-800 border-[1px] border-slate-400 mb-5 p-2 ml-auto" onClick = {clearState}>
      Clear History
    </button>
  )
}


export default ClearState