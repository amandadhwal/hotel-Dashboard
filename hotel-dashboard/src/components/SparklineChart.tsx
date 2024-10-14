import React from "react";
import ReactApexChart from "react-apexcharts";

interface SparklineChartProps {
  data: number[];
  title: string;
}

const SparklineChart: React.FC<SparklineChartProps> = ({ data, title }) => {
  const series = [
    {
      name: title,
      data: data,  // Array of numbers for the sparkline chart
    },
  ];

  const options = {
    chart: {
      type: "line" as "line",  // Explicitly set the type
      sparkline: { enabled: true },  // Enable sparkline mode
    },
    title: {
      text: title,
      align: "center" as "center",  // Correctly typed alignment
    },
    stroke: {
      curve: "smooth" as "smooth",  // Optional: smooth the curve
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: () => "",  // Remove title in tooltip
        },
      },
      marker: {
        show: false,
      },
    },
  };

  return <ReactApexChart options={options} series={series} type="line" height={150} />;
};

export default SparklineChart;
