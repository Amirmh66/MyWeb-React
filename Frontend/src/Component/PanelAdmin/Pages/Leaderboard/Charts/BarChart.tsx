import { Chart, registerables } from "chart.js";
import { useEffect, useRef } from "react";
Chart.register(...registerables);

function BarChart() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["January", "February", "April","Mars" ,"Agust"],
          datasets: [
            {
              label: "Sales",
              data: [12, 15, 16, 18, 1],
              backgroundColor: ["blue","blue","blue","red","green"],
              borderColor: "backgroundChartGreen",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
          scales:{
            y:{
              beginAtZero:true,
            }
          }
        },
      });
    }
    return() => {
      if(chartInstance.current){
        chartInstance.current.destroy();
      }
    }
  }, []);

  return <canvas ref={chartRef}/>
}

export default BarChart;
