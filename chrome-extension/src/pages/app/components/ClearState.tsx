import { SetRelevantData } from '../../../types/types'

interface ClearStateProps {
  setRelevant: SetRelevantData
}

const ClearState = ({ setRelevant }: ClearStateProps) => {
  const clearState = () => {
    setRelevant(new Map())
  }
  return (
    <button
      className="bg-white bg-opacity-10 hover:bg-opacity-50 border border-slate-200 my-3 p-1 mr-2 rounded-md px-2"
      onClick={clearState}
    >
      Clear History
    </button>
  )
}

export default ClearState
