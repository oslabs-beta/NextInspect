export default function convertToEpoch(dateString: string):number {
  const date = new Date(dateString);
  const epochTime = Math.round(date.getTime());
  return epochTime;
}