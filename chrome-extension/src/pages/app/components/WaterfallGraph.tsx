import { getChartJSData} from "../functions/chartJSData";

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
import { RelevantData } from "../../../types/types";



interface WaterfallChartProps {
  data: RelevantData;
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
  maintainAspectRatio: false,
};



const WaterfallChart = ({data} : WaterfallChartProps) => {

  const {barLengths, labels, backgroundColors} = getChartJSData(data)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'All Requests', 
        data: barLengths,
        borderColor: 'rgb(0, 0, 0)',
        backgroundColor: backgroundColors,
        borderWidth: 0,
      },
    ],
  };


  return <Bar options={options} data={chartData} />;

}

export default WaterfallChart
