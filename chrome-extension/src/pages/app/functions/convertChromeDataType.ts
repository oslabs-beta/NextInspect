
import { IAggregatedSortedData, IChromeApiData } from "../../../types/types";


export default function convertChromeDataType(message: IChromeApiData):IAggregatedSortedData{
  let {method, protocol, size, status, startTime, time, urlEndpoint, type} = message;

  const trueStartTime = startTime!;
  const duration = time!;
  const trueEndTime = trueStartTime! + duration;

  return {
    chromeApiDataType: type,
    method,
    status,
    protocol,
    relativeStartTime: 0,
    trueStartTime,
    trueEndTime,
    duration,
    name: urlEndpoint!,
  }
}