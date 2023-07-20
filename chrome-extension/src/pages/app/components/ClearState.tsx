import { ISetRelevantData } from "../../../types/types";

interface ClearStateProps {
  setRelevant: ISetRelevantData;
}

const ClearState = ({setRelevant} : ClearStateProps) => {
  const clearState = () => {
    setRelevant(new Map());
  }
  return (
    <button className="bg-white bg-opacity-10 hover:bg-opacity-50 border-[1px] border-slate-200 my-5 p-1 mr-2 rounded-md" onClick = {clearState}>
      Clear History
    </button>
  )
}

export default ClearState