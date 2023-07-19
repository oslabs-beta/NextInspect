export default function convertToEpoch(dateString: string):number {
  const date = new Date(dateString);
  const epochTime = date.getTime();
  return epochTime;
}