import { ISetRelevantData } from "../../../types/types";

interface ClearStateProps {
  setRelevant: ISetRelevantData;
}

const ClearState = ({setRelevant} : ClearStateProps) => {
  const clearState = () => {
    setRelevant(new Map());
  }
  return (
    <button className="bg-violet-800 border-[1px] border-slate-400 mb-5 p-2 ml-auto" onClick = {clearState}>
      Clear History
    </button>
  )
}

export default ClearState