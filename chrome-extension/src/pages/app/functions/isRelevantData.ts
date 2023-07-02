import { IRelevantData, OtelData, ISetRelevantDataState } from '../../../types/types';


export default function isRelevantData(setRelevantData:ISetRelevantDataState, incomingSpanData: OtelData): void | IRelevantData {  
  // if there is no method attached, return
  if(!('method' in incomingSpanData) || incomingSpanData.method === ""){
    return;
  }
  

  // destructure name 
  const {name, method, traceId} = incomingSpanData;
  // check if name starts with "/?key=" , return 
  if (name.startsWith("/?key=")) {
    return;
  } 

  setRelevantData(prevRelevantData => {
    // const newRelevantData: IRelevantData = new Map([...prevRelevantData.entries()]);
    const newRelevantData: IRelevantData = [...prevRelevantData];


    const newKeyName: string = `${method}, ${name}, ${traceId}`;

    // if(newRelevantData.has(newKeyName)){
    //   const existingData = newRelevantData.get(incomingSpanData.traceId);
    //   existingData?.push(incomingSpanData);
    // }else{
      // newRelevantData.set(newKeyName,[incomingSpanData]);
    // }
    console.log(newKeyName);
    newRelevantData.push(incomingSpanData);
    return newRelevantData;
    
  })
  // otherwise setRelevantData, 
    // create new state and spread out prevRelevant Data
    // add as key, the method, the route, and the traceId: and as a value the incoming span

  


  
}