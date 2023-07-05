import { setFlagsFromString } from 'v8';
import { IRelevantData, OtelData, ISetRelevantDataState, IRelevant, ISetRelevantState, ISetMostRecentEntryState } from '../../../types/types';


export function isRelevantData(setRelevantData:ISetRelevantDataState, incomingSpanData: OtelData): void {  
  // if there is no method attached, return
  if(!('method' in incomingSpanData) || incomingSpanData.method === ""){
    return;
  }
  

  // destructure name 
  let {name, method, traceId} = incomingSpanData;
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

export function isRelevant(setRelevant:ISetRelevantState, mostRecentEntry: string, setMostRecentEntry: ISetMostRecentEntryState, incomingSpanData: OtelData): void | IRelevant {  
  // if there is no method attached, return
  if(!('method' in incomingSpanData) || incomingSpanData.method === ""){
    return;
  }
  

  // destructure name 
  let {name, method, traceId} = incomingSpanData;
  // check if name starts with "/?key=" , return 
  if (name.startsWith("/?key=")) {
    return;
  };
  if (name.startsWith("/_next/static/")){
    const lastIndex = name.lastIndexOf("/");
    name = name.slice(lastIndex + 1);
  }


  setRelevant(prevRelevant => {
    const newRelevant: IRelevant = new Map([...prevRelevant.entries()]);


    // if(name === "/" && mostRecentEntry.includes(`${traceId}`) && mostRecentEntry.includes(`${method}`)){
    //   const existingData = newRelevant.get(mostRecentEntry);
    //   existingData?.push(incomingSpanData);
    // };

    if(name === "/" ){
      const existingData = newRelevant.get(mostRecentEntry);
      existingData?.push(incomingSpanData);

      // ISSUE: look into how useful these spans with no names are. current logic is not working but also not sure if it should be pushing to the most recent entry
      return newRelevant;
    };




    const newKeyName: string = `${method}, ${name}, ${traceId}`;


    if(newRelevant.has(newKeyName)){
      const existingData = newRelevant.get(newKeyName);
      existingData?.push(incomingSpanData);
    }else{
      newRelevant.set(newKeyName,[incomingSpanData]);
      setMostRecentEntry(newKeyName);
    }
    
    return newRelevant;
    
  });
}