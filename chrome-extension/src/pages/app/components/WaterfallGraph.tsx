// import { IMockData } from "../mockData";
// import { getAllTracesTimeInfo, getTraceTimeInfo,IAllTracesTimeInfo,ITotalTimes } from "../functions/getTraceInfo";

import { getChartJSLabels, getChartJSTraceData } from "../functions/chartJSData";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ILengthsOfChartBars, IRelevant } from "../../../types/types";



interface WaterfallChartProps {
  // data: IMockData[][];
  data: IRelevant;
}



ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: 'y' as const,
  scales:{
    y: {
      ticks: {
        display: false
      },
      grid: {display: false}
    },
    x: {
      position: 'top' as const,
    },

  },
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  barThickness: 3,
  plugins: {
    legend: {
      position: 'right' as const,
      display:false
    },
    title: {
      display: false,
    },
  },
};



const WaterfallChart = ({data} : WaterfallChartProps) => {

  // const tracesTimeInfo: IAllTracesTimeInfo = getAllTracesTimeInfo(data);

  const labels: string[]= getChartJSLabels(data);

  const chartJSData: ILengthsOfChartBars = getChartJSTraceData(data);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'All Requests', 
        data: chartJSData,
        borderColor: 'rgb(119, 219, 137)',
        backgroundColor: 'rgba(1, 19, 1, 0.5)',
      },
    ],
  };


  return <Bar options={options} data={chartData} />;

}

export default WaterfallChart
